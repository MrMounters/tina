# Elevated Ink & Aesthetics

Mobile-first website for Christina’s permanent makeup, restorative tattooing, skincare and wellness services in Scottsdale. Static HTML, CSS and JavaScript, with no install or build step.

## Run locally

```sh
python3 -m http.server 8080
```

Open http://localhost:8080.

## Contact behavior

Call and Text use **+1 (602) 706-3400**. Treatment links open an SMS draft with the service name. The visitor chooses whether to send it from their messaging app. The website does not collect personal data, send messages, or confirm appointments.

The Google badge links to the supplied business link. The displayed **5.0 / 26 reviews** is a static snapshot, not an automatically synchronized feed.

## Assets

The supplied portrait has a transparent PNG fallback and responsive transparent WebP renditions. Client treatment pairs are displayed as CSS-framed views of the original uploaded screenshot, with no results retouching. Google Fonts DM Sans and Italiana are subsetted and self-hosted; licenses are in assets/fonts.

## Design verification

See [the original audit](docs/design-audit.md) and [implementation results, evidence and remaining intentional exceptions](docs/refinement-results.md).

The Taste and Impeccable skills were installed in the project workspace and used for this pass. DESIGN-TOOLS.json records their upstream versions. Skill engines and generated screenshots are workspace tooling, not part of the public site's runtime.
