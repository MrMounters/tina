# Messaging, portrait and studio-location release

20 October 2026. Preserves the previous visual refinement and implements the requested additions.

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
