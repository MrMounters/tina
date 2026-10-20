# Messaging, portrait and studio-location release

20 October 2026. Preserves the previous visual refinement and implements the requested additions.

## Portrait service bubbles — mobile visibility fix

A short-screen production check reproduced the issue: at 390×667, lower labels at y=737 and y=784 had already completed their animations before they entered the viewport. The portrait-level observer triggered them too early. The earlier test forced animation times and did not cover the natural short-screen scroll path.

Each bubble is now observed separately and waits until it is fully within the viewport, with a 48px bottom inset. Visible labels retain 600ms separation, the 440ms pop and the small settling scale. Lower labels stay waiting until scrolled into view. Reduced motion keeps all labels visible immediately. The script URL is versioned so the corrected code is fetched on page reload.

## Current motion correction

The hero is a normal direct Text Christina link again. Only the floating control nudges 16px sideways and returns over 850ms, every five seconds while visible and idle. It never automatically opens the options. Tap the chevron to open them; Escape closes them. Peeking pauses for reduced motion, hidden tabs, hidden/offscreen controls, pointer hover, keyboard focus and an open tray. The portrait bubbles retain their one-time arrivals.

Demo footer language and its fictional credentials were removed. The clinic portrait’s visible concept caption was removed at the user’s request; descriptive alt text remains. The image is generated, as recorded below.

The following notes describe the initial release; the correction above supersedes its hero/dock auto-opening and visible portrait-caption behavior.

- Three treatment labels enter once around the original transparent hero portrait, with staggered timing and reduced-motion support.
- Hero and floating Text Christina controls reveal messaging options after 3.5 seconds of visibility. The face peels 78% across; a toggle and Escape open/close the options. Focused controls are not automatically moved. Direct SMS works without JavaScript.
- Messages links use the confirmed +1 (602) 706-3400 number. WhatsApp uses that number; an active WhatsApp account has not been independently confirmed. Instagram and Messenger remain hidden until actual account URLs are entered in contact-config.json. No guessed profile URLs are deployed.
- The footer has WhatsApp and configured social slots. The map and directions use the address explicitly confirmed by the user: 6895 E Camelback Rd, Suite 114, Scottsdale, AZ 85251.
- The new modest clinic portrait is AI-generated from the supplied portrait references at the user’s request. It is labeled “Studio portrait concept” and is not evidence of the actual premises. The hero portrait and client treatment images are retained from the supplied originals.
- The clinic image uses responsive lazy-loaded WebP renditions. The map iframe is also lazy-loaded.

## Validation

Chromium at 320, 390, 768 and 1440px: no horizontal overflow or JavaScript page errors; 22 services retained; all three bubbles present; both messaging controls present; timed reveal, tap and Escape behavior pass; clinic image decodes; confirmed address and map layout pass. Reduced-motion mode exposes the options without the spatial animation.

A local-only contact configuration fixture verifies that all four channel icons fit and are at least 44px at 320px in both hero and floating controls. The fixture account URLs are not in the deployed source. Footer social slots activate from valid configured profile URLs.

The exact production Google Maps iframe URL returns HTTP 200. External map contents were stubbed during local responsive tests; map tiles and native messaging apps were not verified on physical devices. No real text, WhatsApp message or call was sent.

Taste and Impeccable animation guidance informed the restrained one-time reveals and reduced-motion behavior. The pre-existing detector findings are documented in refinement-results.md; the latest Impeccable detector still flags the intentionally retained cream palette. No new all-clear claim is made for the full Taste inspector.

Footer trust signals are proposed separately in footer-trust-plan.md. No unverified license, experience, accreditation or membership is added to the public site.


## Social peek touch correction

The former hover and active-element guards could suppress peeks after touch interaction. The timer now distinguishes desktop hover and keyboard-visible focus from touch focus. Each 5-second cycle briefly clips 36–52px of the closed cover to reveal two compact social icons over 900ms, then returns. The Text Christina label stays fixed. Manual opening remains a separate action. The reduced-motion and offscreen/hidden guards remain. All four tray and footer destinations now use the user-supplied profiles or confirmed phone number; Facebook and Instagram are no longer hidden. Styles and script URLs are versioned for this correction.


## Business-specific Google map and footer branding

The former address-only embed resolved to a suite/location entity, not the business. The corrected map targets Google business CID 10707652014736589159 and place ID ChIJVWpZWmMLK4cRZ8HenMY4mZQ. Google’s live embed payload identifies “Az ink and aesthetics” at 6895 E Camelback Rd #114, Scottsdale, with rating 5 and 26 reviews; it also matches the supplied Google knowledge ID /g/11t7lrrl_n. Directions target that exact place ID.

The map has an ivory business-name header, brass pin, subtle border and rounded frame. The Google map content and attribution remain unobscured, with its native colors and interactions retained. A compact multicolor Google G now accompanies the footer rating. Google controls the business card content; its phone number currently differs from the confirmed 602 number used in the site contact buttons.

Validation for the map update: Chromium at 320, 390 and 1440px loaded the real Google embed, with map tiles and attribution. The iframe payload contains the exact business name, verified place ID and matching address. Screenshots show the named business pin on phones and the full name/address/5.0/26-review card at desktop width. Google uses a compact native card on narrow screens; the custom business-name header remains visible at all widths. No horizontal overflow. Footer Google mark uses four brand colors and renders at 18px. No map layers, attribution or native controls were covered or restyled.
