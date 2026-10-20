const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

// Contact links work without JavaScript. Nothing is sent from this website.
const dock = document.querySelector('.contact-dock');
const contact = document.querySelector('#contact');
if (dock && contact) {
  const protectedContent = [...document.querySelectorAll('h1,h2,.button,summary,.services a')].filter(node => !dock.contains(node));
  let dockBounds;
  let queued = false;
  function measureDock() {
    const wasHidden = dock.hidden;
    dock.hidden = false;
    dockBounds = dock.getBoundingClientRect();
    dock.hidden = wasHidden;
    updateDock();
  }
  function updateDock() {
    queued = false;
    if (dock.querySelector(':focus-visible') || dock.querySelector('.messaging-peel.is-open') || !dockBounds) return;
    const contactBox = contact.getBoundingClientRect();
    const contactVisible = contactBox.top < innerHeight * 0.8 && contactBox.bottom > 0;
    const collision = protectedContent.some(node => {
      if (node.closest('.services') && !node.closest('details')?.open) return false;
      const r = node.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && r.top < dockBounds.bottom + 8 &&
        r.bottom > dockBounds.top - 8 && r.left < dockBounds.right && r.right > dockBounds.left;
    });
    dock.hidden = contactVisible || collision;
  }
  function scheduleUpdate() {
    if (!queued) { queued = true; requestAnimationFrame(updateDock); }
  }
  measureDock();
  addEventListener('scroll', scheduleUpdate, { passive: true });
  addEventListener('resize', measureDock);
  document.addEventListener('toggle', scheduleUpdate, true);
  document.addEventListener('contactlayoutchange', measureDock);
  document.fonts?.ready.then(measureDock);
}

// Keep keyboard focus above the fixed contact controls.
document.addEventListener('focusin', event => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !dock || dock.hidden || dock.contains(target)) return;
  const box = target.getBoundingClientRect();
  const dockBox = dock.getBoundingClientRect();
  if (box.bottom > dockBox.top && box.top < dockBox.bottom) {
    target.scrollIntoView({ block: 'center', behavior: 'instant' });
  }
});

// A short arrival sequence, then a staggered reveal of the actual client work.
// Everything is visible by default, including with JavaScript disabled.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const items = [...document.querySelectorAll('[data-reveal]')];
  const reveal = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
      entry.target.animate(
        [{ transform: 'translateY(12px)', opacity: 0.88 }, { transform: 'translateY(0)', opacity: 1 }],
        { duration: 620, delay: Math.min(index, 3) * 70, easing: 'cubic-bezier(.16,1,.3,1)' }
      );
      reveal.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  items.forEach(item => reveal.observe(item));
}

// On phones, each label waits until it is actually in view; the portrait alone
// must not start lower labels while they are still beneath the screen.
const portrait = document.querySelector('.portrait');
const bubbleMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (portrait && 'IntersectionObserver' in window && !bubbleMotion.matches) {
  const bubbles = [...portrait.querySelectorAll('.treatment-bubble')];
  const visible = new Set();
  const started = new Set();
  let nextPopAt = 0;
  const arrivals = new Map(bubbles.map(bubble => {
    const animation = bubble.animate([
      { opacity: 0, transform: 'translateY(8px) scale(.78)', offset: 0 },
      { opacity: 1, transform: 'translateY(0) scale(1.035)', offset: .72 },
      { opacity: 1, transform: 'translateY(0) scale(1)', offset: 1 }
    ], { duration: 440, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
    animation.pause();
    animation.currentTime = 0;
    return [bubble, animation];
  }));
  const imageReady = portrait.querySelector('img').decode().catch(() => {});
  const bubbleArrival = new IntersectionObserver(async entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= .99) visible.add(entry.target);
      else visible.delete(entry.target);
    });
    await imageReady;
    if (bubbleMotion.matches) return;
    bubbles.forEach(bubble => {
      if (!visible.has(bubble) || started.has(bubble)) return;
      const now = performance.now();
      const delay = Math.max(150, nextPopAt - now);
      nextPopAt = now + delay + 600;
      const animation = arrivals.get(bubble);
      animation.effect.updateTiming({ delay });
      animation.play();
      started.add(bubble);
      bubbleArrival.unobserve(bubble);
      animation.finished.then(() => animation.cancel()).catch(() => {});
    });
  }, { threshold: .99, rootMargin: '0px 0px -48px 0px' });
  bubbleMotion.addEventListener('change', () => {
    if (bubbleMotion.matches) {
      bubbleArrival.disconnect();
      arrivals.forEach(animation => animation.cancel());
    }
  });
  bubbles.forEach(bubble => bubbleArrival.observe(bubble));
}

// External profiles stay absent until a real account URL is supplied.
fetch('contact-config.json').then(response => {
  if (!response.ok) throw new Error('Contact configuration unavailable');
  return response.json();
}).then(config => {
  for (const channel of ['instagram', 'messenger', 'facebook']) {
    const value = config[channel];
    if (!value) continue;
    const url = new URL(value);
    const validHosts = channel === 'instagram' ? ['instagram.com', 'www.instagram.com'] : ['facebook.com', 'www.facebook.com', 'm.me', 'www.messenger.com', 'messenger.com'];
    if (url.protocol !== 'https:' || !validHosts.includes(url.hostname)) continue;
    document.querySelectorAll(`[data-channel="${channel}"]`).forEach(link => {
      link.href = url.href;
      link.hidden = false;
    });
  }
}).catch(() => { /* Direct text and WhatsApp are already in the HTML. */ });

// Only the floating control peeks at the social icons, then closes, every five seconds.
// Messaging options open only on request; a peek never changes focus or semantics.
const peel = document.querySelector('.contact-dock .messaging-peel');
if (peel) {
  peel.classList.add('is-ready');
  const toggle = peel.querySelector('.peel-toggle');
  const tray = peel.querySelector('.messaging-tray');
  const face = peel.querySelector('.peel-face');
  const shine = peel.querySelector('.cta-shine');
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let peekAnimations = [];
  const stopPeek = () => {
    peekAnimations.forEach(animation => animation.cancel());
    peekAnimations = [];
  };
  const setOpen = open => {
    stopPeek();
    peel.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Hide messaging options' : 'Show messaging options');
    tray.inert = !open;
    tray.setAttribute('aria-hidden', String(!open));
    face.setAttribute('aria-expanded', String(open));
    face.inert = open;
    requestAnimationFrame(() => peel.dispatchEvent(new Event('contactlayoutchange', { bubbles: true })));
  };
  face.addEventListener('click', () => {
    setOpen(true);
    requestAnimationFrame(() => tray.querySelector('a[href]')?.focus({ preventScroll: true }));
  });
  toggle.addEventListener('click', () => setOpen(!peel.classList.contains('is-open')));
  peel.addEventListener('keydown', event => {
    if (event.key === 'Escape' && peel.classList.contains('is-open')) {
      event.preventDefault();
      setOpen(false);
      face.focus();
    }
  });
  peel.addEventListener('pointerenter', stopPeek);
  peel.addEventListener('pointerdown', stopPeek);
  peel.addEventListener('focusin', stopPeek);
  motionPreference.addEventListener('change', stopPeek);
  document.addEventListener('visibilitychange', stopPeek);
  // A recurring nudge is explicitly requested, but never runs offscreen or at rest
  // under a pointer, keyboard focus, a reduced-motion preference, or an open tray.
  setInterval(() => {
    stopPeek();
    if (motionPreference.matches || document.hidden || dock.hidden ||
        peel.classList.contains('is-open') || dock.querySelector(':focus-visible') ||
        (matchMedia('(hover: hover)').matches && peel.matches(':hover')) || !peel.getClientRects().length) return;
    const bounds = peel.getBoundingClientRect();
    if (bounds.bottom <= 0 || bounds.top >= innerHeight) return;
    // Clip only the cover's edge: the label stays still and legible while two
    // small social marks peek out. Touch focus never blocks the next cycle.
    const room = peel.clientWidth - face.querySelector('span').getBoundingClientRect().width - 24;
    const desired = peel.querySelector('.peek-signals').getBoundingClientRect().width + 12;
    const distance = Math.max(40, Math.min(desired, room));
    const timing = { duration: 2400, easing: 'linear', iterations: 1 };
    peekAnimations = [
      face.animate([
        { clipPath: 'inset(0 0px 0 0 round 28px)', offset: 0, easing: 'cubic-bezier(.45,0,.2,1)' },
        { clipPath: `inset(0 ${distance}px 0 0 round 28px)`, offset: .32 },
        { clipPath: `inset(0 ${distance}px 0 0 round 28px)`, offset: .64, easing: 'cubic-bezier(.45,0,.2,1)' },
        { clipPath: 'inset(0 0px 0 0 round 28px)', offset: 1 }
      ], timing),
      toggle.animate([
        { opacity: 1, offset: 0 }, { opacity: 0, offset: .18 },
        { opacity: 0, offset: .82 }, { opacity: 1, offset: 1 }
      ], timing),
      shine.animate([
        { transform: 'translateX(-150%) skewX(-22deg)', opacity: 0 },
        { transform: 'translateX(-80%) skewX(-22deg)', opacity: .65, offset: .2 },
        { transform: 'translateX(550%) skewX(-22deg)', opacity: .65, offset: .8 },
        { transform: 'translateX(650%) skewX(-22deg)', opacity: 0 }
      ], { duration: 1050, delay: 2100, easing: 'ease-in-out', iterations: 1 })
    ];
  }, 5000);
}

// The footer hint also opens by tap or keyboard, without navigating away.
const intakeInfo = document.querySelector('.intake-info');
const intakeTip = document.querySelector('#intake-tooltip');
if (intakeInfo && intakeTip) {
  const showTip = open => { intakeTip.hidden = !open; intakeInfo.setAttribute('aria-expanded', String(open)); };
  intakeInfo.addEventListener('click', () => showTip(intakeTip.hidden));
  intakeInfo.addEventListener('mouseenter', () => { if (matchMedia('(hover: hover)').matches) showTip(true); });
  intakeInfo.addEventListener('mouseleave', () => { if (document.activeElement !== intakeInfo) showTip(false); });
  intakeInfo.addEventListener('blur', () => showTip(false));
  intakeInfo.addEventListener('keydown', event => { if (event.key === 'Escape') showTip(false); });
  document.addEventListener('pointerdown', event => { if (!event.target.closest('.intake-link-group')) showTip(false); });
}

// Older iPhone Messages links use &body; retain each link's existing draft text.
const iosMessages = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
if (iosMessages) document.querySelectorAll('a[href^="sms:"]').forEach(link => {
  link.setAttribute('href', link.getAttribute('href').replace('?body=', '&body='));
});
