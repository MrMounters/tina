const form = document.querySelector('#new-client-form');
const panels = [...form.querySelectorAll('[data-panel]')];
const navigation = form.querySelector('.intake-navigation');
const next = document.querySelector('#intake-next');
const back = document.querySelector('#intake-back');
const error = document.querySelector('#intake-error');
const progress = document.querySelector('.intake-progress');
const fill = document.querySelector('.intake-progress-fill');
const summary = document.querySelector('#intake-summary');
const send = document.querySelector('#intake-send');
const copy = document.querySelector('#intake-copy');
const handoff = document.querySelector('#intake-handoff');
const stepNames = ['Your interests', 'Your goals', 'Your details', 'Your note'];
let step = 0;
let draft = '';
const values = name => [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value);
const field = name => form.elements.namedItem(name);

function clearError() {
  error.hidden = true;
  error.textContent = '';
  form.querySelectorAll('[aria-invalid]').forEach(input => input.removeAttribute('aria-invalid'));
}
function showError(message, input) {
  error.textContent = message;
  error.hidden = false;
  if (input) { input.setAttribute('aria-invalid', 'true'); input.focus(); }
  return false;
}
function validate() {
  clearError();
  if (step === 0 && !values('interest').length) return showError('Choose at least one interest. “Help me decide” is a lovely place to start.', form.querySelector('[name="interest"]'));
  if (step === 1 && !values('goal').length) return showError('Choose at least one goal, or select “A little guidance.”', form.querySelector('[name="goal"]'));
  if (step === 2) {
    if (field('name').value.trim().length < 2) return showError('Please add your name so Christina knows who to reply to.', field('name'));
    const digits = field('phone').value.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 15) return showError('Please enter a phone number with 7–15 digits, including your country code if needed.', field('phone'));
  }
  return true;
}
function buildReview() {
  const name = field('name').value.trim();
  const phone = field('phone').value.trim();
  const interests = values('interest').join(', ');
  const goals = values('goal').join(', ');
  const timing = field('timing').value;
  const reply = field('reply').value;
  const referral = field('referral').value;
  const notes = field('notes').value.trim();
  const updates = field('updates').checked;
  const rows = [['Interested in', interests], ['Hoping for', goals], ['Timing', timing], ['Your details', `${name}\n${phone} · ${reply}`]];
  if (notes) rows.push(['Your vision', notes]);
  if (referral) rows.push(['Found us through', referral]);
  rows.push(['Studio news & offers', updates ? 'Yes, I’d like occasional updates' : 'Not requested']);
  summary.replaceChildren();
  rows.forEach(([title, content]) => {
    const row = document.createElement('div');
    const term = document.createElement('dt');
    const detail = document.createElement('dd');
    term.textContent = title;
    detail.textContent = content;
    row.append(term, detail);
    summary.append(row);
  });
  draft = `Hi Christina! I’m new to Elevated Ink & Aesthetics.\n\nName: ${name}\nPhone: ${phone}\nInterested in: ${interests}\nGoals: ${goals}\nTiming: ${timing}\nPreferred reply: ${reply}`;
  if (notes) draft += `\nMy vision: ${notes}`;
  if (referral) draft += `\nFound you through: ${referral}`;
  draft += `\nStudio news and offers: ${updates ? 'Yes, I would like occasional updates.' : 'Not requested.'}`;
  const whatsapp = reply === 'WhatsApp';
  send.href = whatsapp ? `https://wa.me/16027063400?text=${encodeURIComponent(draft)}` : `sms:+16027063400?body=${encodeURIComponent(draft)}`;
  send.firstChild.textContent = whatsapp ? 'Open WhatsApp draft ' : 'Open text draft ';
  if (whatsapp) { send.target = '_blank'; send.rel = 'noopener'; }
  else { send.removeAttribute('target'); send.removeAttribute('rel'); }
}
function showStep(index, focus = true) {
  step = index;
  clearError();
  panels.forEach((panel, i) => { panel.hidden = i !== index; });
  back.hidden = index === 0;
  next.hidden = index === 3;
  document.querySelector('#intake-step-count').textContent = `Step ${index + 1} of 4`;
  document.querySelector('#intake-step-name').textContent = stepNames[index];
  progress.setAttribute('aria-valuenow', String(index + 1));
  progress.setAttribute('aria-valuetext', `Step ${index + 1} of 4: ${stepNames[index]}`);
  fill.style.width = `${(index + 1) * 25}%`;
  if (index === 3) buildReview();
  if (focus) {
    const title = panels[index].querySelector('legend,h2');
    title.tabIndex = -1;
    title.focus({ preventScroll: true });
    const shell = document.querySelector('.intake-shell');
    if (shell.getBoundingClientRect().top < 0 || window.innerWidth <= 760) shell.scrollIntoView({ block: 'start', behavior: 'instant' });
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) panels[index].animate([{ opacity: .7, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'ease-out' });
  }
}
next.addEventListener('click', () => { if (validate()) showStep(step + 1); });
back.addEventListener('click', () => showStep(Math.max(0, step - 1)));
form.addEventListener('submit', event => { event.preventDefault(); if (step < 3 && validate()) showStep(step + 1); });
form.addEventListener('input', clearError);
send.addEventListener('click', () => {
  handoff.textContent = field('reply').value === 'WhatsApp' ? 'Your WhatsApp draft is ready. Send it there to reach Christina.' : 'Your text draft is ready. Send it in Messages to reach Christina.';
});
copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(draft);
    handoff.textContent = 'Copied. Paste your request into a message to Christina at (602) 706-3400.';
    copy.textContent = 'Copied to clipboard';
  } catch {
    handoff.textContent = 'Copy the details above, then text Christina at (602) 706-3400.';
  }
});
navigation.hidden = false;
showStep(0, false);
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  fill.style.width = '0%';
  requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = '25%'; }));
}
