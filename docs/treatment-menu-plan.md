# Treatment menu: plan and implementation

## Current revision: service grid

At the client's request, the treatment table and every repeated Ask link have been removed. The current layout is a semantic list grid: two columns on phones, three on tablets and four on desktop, grouped under the existing category headings. Each tile contains its original line icon and service name. Tiles are informational; the floating contact control and new-client form remain the shared ways to inquire. All 22 services, category filters, announced counts, incoming fragment links, no-JavaScript visibility and reduced-motion behavior remain.

Checked at 320, 375, 768 and 1440px for grid columns, complete content, category counts, no horizontal overflow and no JavaScript errors. Mobile and desktop captures reviewed. Earlier table-specific implementation notes below describe the superseded version.

## Direction

Expand the existing ivory, ink and brass visual system into a treatment ledger. Preserve the original portrait, hero, client work, messaging chooser and studio information. The original 22 service names and individual inquiry drafts are the source of truth; no prices, treatment times, outcomes or credentials are invented.

On this page, Christina’s range from brow artistry to restorative tattooing and wellness becomes a browsable studio treatment menu. Its useful interaction is category selection with real service-specific inquiry drafts.

## Layout plan

- Replace closed accordions with a semantic table so the complete menu is available immediately.
- Group treatments into brows, cosmetic details, restorative tattooing, skin care and wellness. Keep the existing category fragment IDs for search and incoming links.
- Give every treatment a consistent 24-unit line icon. Distinguish brow techniques through strokes, dots and layered lines; use recognisable lip, ear, skin-care and wellness forms elsewhere.
- Keep rows concise: treatment name and an explicit Ask action. Each action opens the existing text draft identifying that treatment.
- Add six category controls, including All treatments, with pressed states and an announced result count. Show every service if JavaScript is unavailable.
- At 375px, place filters in two equal rows of three, retain readable service names and provide 48px inquiry targets. Do not require horizontal scrolling.
- Animate category changes briefly; honor reduced motion. Preserve keyboard focus on the selected control.

## Verification

Chromium layouts checked at 320, 375, 390, 768 and 1440px: all 22 services present, all category counts correct, no horizontal overflow, service-specific message bodies retained, and no JavaScript errors. iPhone user-agent checks retain the iOS Messages body separator. Keyboard Enter, incoming category anchors, no-JavaScript fallback and reduced-motion filtering checked. No real message was sent. Physical iPhone/Safari hardware is not available.

Rendered mobile and desktop table captures were reviewed. The table’s row rules are intentional semantic-table separators, an explicit Taste exception. Existing site-wide detector findings for the requested CTA shine, existing map/credential outlines and footer styling remain outside this focused change; no clean whole-site detector pass is claimed.

The supplied replacement license number is 77777. The existing pending-confirmation note remains; this change does not assert independent verification of professional credentials. Previously supplied Facebook, Messenger and Instagram destinations remain connected.
