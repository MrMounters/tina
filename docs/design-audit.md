# Elevated Ink: Taste + Impeccable audit and implementation plan

Reviewed 20 October 2026. Scope: audit the current site; correct the reported portrait clipping. The broader redesign remains a plan, not an approved replacement of the current visual direction.

## Skills actually used

- Taste `design-taste-frontend`, upstream Leonxlnx/taste-skill at 588d11adcac1713519e8a38f8517601e93fb6251. Read its SKILL.md and screenshot-critique reference. Executed its bundled browser inspector at 1440px, 768px and 390px. Opened all seven generated fold and page-sheet images after the framing change.
- Impeccable 4.7.0, engine 0.1.16. Read its SKILL.md, audit, polish and craft-floor references. Loaded project context and executed the bundled mechanical detector against index.html and styles.css. Automatic edit hooks are not enabled; these were manual runs.

Commands:

```sh
.agents/skills/impeccable/scripts/impeccable context --target index.html
.agents/skills/impeccable/scripts/impeccable detect --json index.html styles.css
node .agents/skills/design-taste-frontend/scripts/inspect.mjs http://127.0.0.1:8081
```

Taste's browser initially failed to start in this execution container. The completed runs used a Chromium executable wrapper with `--no-sandbox --disable-dev-shm-usage` for local QA. This changes neither production browser security nor the inspector's rules.

## Fixed now: portrait clipping

The hero used `object-fit: cover` inside a constrained-height container. The mobile artist portrait additionally used `margin-top: -12px` inside an overflow-hidden container. Both could discard image pixels at the top.

The hero now uses `contain` with space above the head. The second portrait no longer has a negative top margin or a height-constrained clipping container. PNG transparency and the warm site background remain.

Chromium checks passed at 320, 390, 768 and 1440px: both images loaded, no horizontal overflow, image elements stayed inside their containers, no JavaScript errors. Hero top inset: 18px on phones, 103px at tablet width, 24px at desktop width. Call and SMS destinations remained `+16027063400`. These checks verify layout and link destinations; they do not place a call or send a text.

## Audit result: further work required

Taste's final inspector reports **10 FAIL and 8 WARN groups**. Impeccable's source detector reports **54 observations**, including repeated instances of the same underlying issue. These are not 54 independent user-facing defects. This site does not pass either skill's full quality workflow yet.

### Technical health assessment (Impeccable rubric)

| Dimension | Assessment / 4 | Evidence |
| --- | --- | --- |
| Accessibility | 2 | Gold labels measured about 3.3:1 against the page; muted copy about 4.46:1. Keyboard focus styles and dialog labels exist, but many labels are too small. |
| Performance | 2 | No framework runtime or dependencies for the page. Below-fold portrait is lazy loaded. The transparent portrait is approximately 1.9 MB, no responsive variants, and fonts load through a CSS import. No real-device network performance measurement was performed. |
| Theming | 2 | Core CSS variables exist but inline badge/contact styles and several hard-coded colors bypass them. The deliberate light theme is not itself a defect; dark mode was not requested. |
| Responsive | 2 | Portrait framing now passes at four widths. Numerous secondary links and service rows need target-size review; the mobile lip example is hidden. Sticky bar transiently overlaps content during scrolling. |
| Implementation integrity | 2 | Call/Text use real confirmed destinations. The consultation selector does not transmit the chosen service and hands visitors to the old website. Typography and layout contain repeated decorative scaffolding. |
| Total | **10/20** | Significant improvements remain; this is a reviewer assessment, not an automated certification. |

## Prioritized plan

1. **P1: Contact flow.** Make primary hero and closing actions lead to texting or calling the confirmed number. Remove the selector-to-old-site detour, or connect it to a real booking system when supplied. Preserve service context only if it is actually passed to the contact destination. Suggested Impeccable passes: clarify, distill.
2. **P1: Readability and contrast.** Raise body copy toward 16px and essential secondary text toward 13px; meet 4.5:1 contrast for normal text. Consolidate the current 22 measured sizes into a small scale. Check at narrow widths and enlarged text. Suggested passes: typeset, harden.
3. **P1: Floating CTA behavior.** Preserve Call and Text. Check every scroll position, focus state and phone safe area. Avoid hiding essential controls or copy behind the fixed bar. Taste flagged a covered closing heading; screenshot review confirms transient overlaps elsewhere, so exercise the full scroll path before calling this solved. Suggested passes: adapt, layout.
4. **P2: Hero clarity.** Explain the service and Scottsdale location in readable supporting text. Keep the requested Google rating badge and subject portrait. The headline alone currently fails the five-second explanation test. Suggested passes: clarify, layout.
5. **P2: Real results on mobile.** Show a lip example alongside brows instead of hiding the third image. Preserve original paired comparisons and avoid assigning unsupported before/after chronology. Consider an accessible larger-image view. Suggested passes: adapt, polish.
6. **P2: Asset delivery.** Produce smaller transparent responsive image variants, reserve dimensions, and reduce font-loading overhead while preserving the chosen appearance. Suggested pass: optimize.
7. **P3: Visual system.** Remove decorative section numbering and low-value micro-labels; reduce competing typefaces; reconsider repeated italic display treatment, hairlines, blur panels and duplicated portrait use in the broader design pass. Suggested passes: distill, typeset, polish.

## Taste screenshot critique

ROUND 1

Seen in one second: Christina's portrait, followed by a large serif headline.

Idea (one sentence): Personal artistry presented through Christina and her actual client work; the surrounding editorial template remains generic.

Live thing: Expandable treatment groups, plus direct Call and Text links.

Layout words by section: hero=split / treatments=list / results=grid / artist=split / closing=statement.

Scores: design 6.0 · usability 5.5 · creativity 5.0 · content 6.0 → overall 5.7.

Caps applied: open inspector failures cap overall at 6.0; generic heading and small running text constrain usability and design. This is an explicit reviewer judgment, not a score generated by the detector.

Top problems: contact detour, tiny low-contrast copy, repetitive generic headings and decorative scaffolding. Portrait clipping is fixed in this patch.

## Findings requiring interpretation

- The requested Google review pill, warm palette and fixed contact CTA are user requirements. Keep them functional and readable; do not delete them simply to satisfy Taste's aesthetic preferences.
- No authentic video was supplied. Do not add invented process footage or a stock model to clear the no-footage warning.
- Taste counts two HTML images; CSS crops show actual client comparisons too. The count is not a complete inventory of visible photographic content.
- Taste misidentifies some expanded service items as eyebrow labels. Treat these as detector false positives, not instructions to remove services.
- Lack of animation is a Taste style failure, not an accessibility defect. Any future motion must earn its place and preserve reduced-motion behavior.
- The review count is static and sourced from the previously checked public directory. No live Google API synchronization is installed.

## Acceptance for the next design pass

Complete the contact path, readable text, contrast, touch and keyboard checks; render phone/tablet/desktop and enlarged text; inspect every screenshot; rerun both skills after the planned changes. Record intentional brand exceptions separately from genuine defects. Verify the matching production commit on Vercel.
