const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

// Contact links work without JavaScript. Nothing is sent from this website.
const dock = document.querySelector('.contact-dock');
const contact = document.querySelector('#contact');
if (dock && contact) {
  const protectedContent = [...document.querySelectorAll('h1,h2,.button,summary,.services a')];
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
