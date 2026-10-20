# Copy, local SEO and sharing review

20 October 2026. The existing brand voice and “Beauty, with you in mind” headline are retained. This is a focused copy and discoverability pass, not a replacement visual design.

## Copy decisions implemented

- The hero anchors the studio in Scottsdale and names microblading, lip blush, restorative tattooing and skin care.
- Client-work copy describes actual brow and lip tattoo examples and invites a direct conversation, without guaranteeing outcomes or inventing before/after order.
- Navigation uses “Client work.” Treatment summaries name the actual interests behind each group: microblading/brows, lip blush/cosmetic details, scar/areola tattooing, skin care/microneedling and yoga/meditation/sound.
- Each treatment group has a stable, descriptive HTML fragment ID. All 22 original service links remain direct service-specific SMS drafts.
- “Start your client form” gives new visitors a relevant internal route from the treatments section. The hero’s direct Text Christina action remains primary.
- Christina’s introduction ties the artist, studio and Scottsdale together in ordinary language. No scarcity, rankings, results, prices, credentials or response-time promises were invented.

## Search and share metadata

- Distinct page titles, descriptions and self-referencing canonical URLs for the homepage and new client form.
- Open Graph and large Twitter card metadata on both pages, with absolute HTTPS image URLs, image dimensions/type and descriptive alt text.
- The supplied brand banner is copied unchanged to assets/og-elevated-ink.jpg (1280×672 JPEG, approximately 189KB), preserving its complete artwork.
- BeautySalon JSON-LD records the current brand, alternate AZ Ink name, confirmed address/phone, supplied social accounts, exact Google Maps listing and all 22 service entries with working section anchors. No unverified license, insurance, accreditation, prices, hours or self-serving rating markup is included.
- robots.txt allows public pages, keeps internal docs out of search crawls, and references a sitemap listing the two public HTML pages. URLs use the current tina-lac.vercel.app host and must be updated if a custom domain becomes canonical.

## Responsive social links

Four equal columns replace the wrapping footer flex row. Phone layouts put each icon above its label so all four labels fit in a single row while preserving minimum 44px targets. Tested at 320, 375 (iPhone 7 CSS viewport), 390, 768 and 1440px. Labels remain visible, columns align, and the page has no horizontal overflow.

## Verification and limits

Chromium mobile/touch emulation: one social row, equal widths, labels within bounds, minimum targets; 22 services retained; single H1; all structured-data fragment targets exist; both pages have the intended canonical and image metadata; sitemap parses; supplied JPEG dimensions and size checked; no JavaScript page errors. Phone social-row screenshots reviewed.

Search crawling, indexing, ranking and social-network thumbnail refresh timing are controlled by their respective platforms. This release sets metadata; it does not claim that a search engine indexed the site or that an external app refreshed an existing cached preview. Physical iPhone 7/Safari hardware was not available; the exact 375×667 viewport was tested.
