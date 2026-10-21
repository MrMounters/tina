# Stable floating contact CTA

The prior scroll handler toggled `display:none` whenever the fixed CTA intersected a heading or protected action. A full-page 375px browser sweep recorded 43 `hidden` attribute mutations, repeatedly removing and restoring the bar. Resize events also temporarily unhid and remeasured it while the mobile browser toolbar changed height.

The CTA now stays mounted and visible throughout ordinary scrolling. It no longer performs collision measurements or visibility updates on scroll, font loading, service filters or layout changes. Its own compositing layer isolates the fixed surface from the animated message cover. The existing five-second social peek, shine, four-channel chooser and reduced-motion preference remain intact.

When an external editable field has focus and the visual viewport shrinks by more than 150px, the CTA becomes invisible and inert until the keyboard closes. Small toolbar height changes do not hide it. Asset versions were updated on the homepage and intake page.

## Verification

- Chromium mobile emulation at 320, 375 and 390px, plus desktop at 1440px: full-page scroll down/up yielded zero CTA visibility mutations, no horizontal overflow and no JavaScript errors.
- Viewport-height changes retained an on-screen CTA; opening/closing the chooser exposed all four messaging links without overflow.
- Five-second peek resumed after touch; reduced-motion disabled automatic motion while preserving the chooser.
- Browser keyboard-height simulation covered hidden/inert and toolbar/restored states.
- This environment has no Safari/WebKit runtime or physical iPhone; those device-specific checks are not claimed.
