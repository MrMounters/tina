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
    if (dock.contains(document.activeElement) || !dockBounds) return;
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

// Each bubble is revealed once. This is an entrance, never an endless bobbing loop.
const portrait = document.querySelector('.portrait');
if (portrait && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const bubbleArrival = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    portrait.querySelectorAll('.treatment-bubble').forEach((bubble, index) => {
      bubble.animate([
        { opacity: 0, transform: 'translateY(14px) scale(.94)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ], { duration: 700, delay: 350 + index * 180, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
    });
    bubbleArrival.disconnect();
  }, { threshold: .3 });
  bubbleArrival.observe(portrait);
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

const peels = [...document.querySelectorAll('.messaging-peel')];
peels.forEach(peel => {
  peel.classList.add('is-ready');
  const toggle = peel.querySelector('.peel-toggle');
  const tray = peel.querySelector('.messaging-tray');
  const face = peel.querySelector('.peel-face');
  let userInteracted = false;
  const setOpen = open => {
    peel.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Hide messaging options' : 'Show messaging options');
    tray.inert = !open;
    tray.setAttribute('aria-hidden', String(!open));
    face.inert = open;
    requestAnimationFrame(() => peel.dispatchEvent(new Event('contactlayoutchange', { bubbles: true })));
  };
  toggle.addEventListener('click', () => {
    userInteracted = true;
    setOpen(!peel.classList.contains('is-open'));
  });
  peel.addEventListener('keydown', event => {
    if (event.key === 'Escape' && peel.classList.contains('is-open')) {
      event.preventDefault();
      userInteracted = true;
      setOpen(false);
      toggle.focus();
    }
  });
  if ('IntersectionObserver' in window) {
    const startOnce = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      startOnce.disconnect();
      setTimeout(() => {
        if (!userInteracted && !peel.contains(document.activeElement) && !peel.closest('.contact-dock')?.contains(document.activeElement)) setOpen(true);
      }, 3500);
    }, { threshold: .7 });
    startOnce.observe(peel);
  }
});
