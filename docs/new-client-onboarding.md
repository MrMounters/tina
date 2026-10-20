# New client onboarding

The footer links to /new-client.html, a dedicated responsive onboarding page. Its information button exposes a tooltip on hover, tap, keyboard activation, or Escape to dismiss. The form uses the established ivory and ink identity, a restrained blush/rose action color, Christina’s original transparent portrait and self-hosted fonts.

## Journey

1. Interests: brows, lips, skin, restorative tattooing, yoga/meditation/sound healing, tiny tattoos/freckles/piercings/gems, or help deciding. Multiple choices are supported.
2. Goals: desired look/experience, timing and optional freeform vision (400 characters).
3. Contact: name, phone, preferred reply; optional referral source and separately unchecked studio-updates permission.
4. Review: editable by going back, with a text or WhatsApp draft and a clipboard fallback.

The progress indicator moves through 25%, 50%, 75% and 100%, with an accessible step label and reduced-motion alternative. Steps have short restrained transitions. Answers survive backward navigation within the page. Required interests/goals/name/phone show specific errors and move focus to the relevant control. All user text is rendered with textContent, not HTML.

## Delivery and limits

This is a static guided inquiry, not an appointment booking or server submission. It builds an encoded message draft to +1 (602) 706-3400 or the existing WhatsApp number. The client reviews and sends the message in their own messaging app. The interface never claims delivery or confirms an appointment. The updates checkbox only adds the client’s stated preference to that draft; no mailing list subscription is created. Contact details and answers are not stored in localStorage or submitted to a website endpoint. No health history, payment or account signup is requested.

With JavaScript disabled, the page offers a direct Text Christina fallback. Native Messages and WhatsApp handoffs depend on the client’s device/app setup. Physical iOS/Android messaging-app behavior was not available for testing.

## Validation

Chromium mobile touch flow from the actual footer tooltip and link through all four steps: required-field errors; back navigation with retained values; accessible step progression; SMS and WhatsApp destinations/content; optional updates unchecked by default and included only when selected; clipboard handoff; text escaping; reduced motion; JavaScript-disabled fallback. Screenshots reviewed at 320, 390, 768 and 1440px, with no horizontal overflow. External protocol navigation was prevented during QA; no real message was sent.
