---
version: alpha
name: 3D Wellness
description: A spacious, editorial nonprofit web system with oversized headlines, cool blue imagery, and a restrained lime accent.
colors:
  primary: "#B5C94D"
  primary-dark: "#1A1A14"
  secondary: "#333333"
  tertiary: "#E5E7EB"
  neutral: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#333333"
  background: "#FFFFFF"
  text: "#333333"
  accent: "#B5C94D"
  border: "#E5E7EB"
  muted: "#F7F8F3"
  inverse: "#1A1A14"
  error: "#B00020"
typography:
  headline-display:
    fontFamily: Poppins
    fontSize: 85px
    fontWeight: 600
    lineHeight: 85px
    letterSpacing: 0px
  headline-lg:
    fontFamily: Poppins
    fontSize: 65px
    fontWeight: 600
    lineHeight: 78px
    letterSpacing: 0px
  headline-md:
    fontFamily: Poppins
    fontSize: 42px
    fontWeight: 600
    lineHeight: 50px
    letterSpacing: 0px
  headline-sm:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: 600
    lineHeight: 40px
    letterSpacing: 0px
  body-lg:
    fontFamily: Poppins
    fontSize: 20px
    fontWeight: 300
    lineHeight: 30px
    letterSpacing: 0px
  body-md:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: 300
    lineHeight: 24px
    letterSpacing: 0px
  body-sm:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: 300
    lineHeight: 20px
    letterSpacing: 0px
  label-lg:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Poppins
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0.08em
  nav-link:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  button-text:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 8px
  sm: 28px
  md: 60px
  lg: 88px
  xl: 190px
  gutter: 60px
  section: 88px
  page: 60px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-dark}"
    typography: "{typography.button-text}"
    rounded: "{rounded.sm}"
    padding: 16px 60px
    height: 50px
    width: 276px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-dark}"
    typography: "{typography.button-text}"
    rounded: "{rounded.sm}"
    padding: 16px 60px
    height: 50px
    width: 276px
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.button-text}"
    rounded: "{rounded.sm}"
    padding: 16px 60px
    height: 50px
    width: 276px
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.button-text}"
    rounded: "{rounded.none}"
    padding: 0px
    height: 24px
    width: 0px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 16px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 16px
  chip:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 8px
---

# 3D Wellness

## Overview

This system feels calm, editorial, and mission-driven, with a polished nonprofit tone rather than a playful consumer brand. The layout is airy and image-led, using very large headlines and generous whitespace to create a sense of confidence and dignity. The visual language balances wellness and futurism: restrained text, bright white surfaces, and a single lime accent against dark-blue imagery.

## Colors

- **Primary (#B5C94D):** A muted lime green used for the main call to action and small emphasis moments. It provides optimism and energy without overwhelming the page.
- **Secondary (#333333):** A soft charcoal used for body copy, navigation, and secondary actions. It keeps text readable while staying less harsh than pure black.
- **Tertiary (#E5E7EB):** A light neutral border tone for subtle separation. Use it for cards, dividers, and low-emphasis outlines.
- **Neutral / Surface / Background (#FFFFFF):** Clean white is the dominant canvas color, supporting the spacious editorial layout and keeping the brand feeling open and accessible.
- **On-surface / Text (#333333):** The default text color across most content areas. It supports a calm, high-contrast reading experience.
- **Muted (#F7F8F3):** A very light off-white for gentle backgrounds, chips, or inset sections when pure white needs soft differentiation.
- **Inverse (#1A1A14):** A deep near-black for button text and rare dark UI moments. It pairs well with the primary lime for clear emphasis.
- **Error (#B00020):** Reserved for validation and destructive states; it is not part of the visible hero palette but should remain accessible and restrained.

## Typography

Poppins is the primary brand typeface and should be used across headings, body copy, labels, and navigation. The site relies on strong weight contrast more than multiple font families: bold 600-weight headlines and very light 300-weight body copy create the distinctive editorial hierarchy.

Use `headline-display` and `headline-lg` for hero and section titles; these are intentionally oversized and tightly set. `headline-md` and `headline-sm` support subheads, content lead-ins, and smaller section headers. Body styles remain clean and modern, with `body-lg` for introductory prose and `body-md`/`body-sm` for standard reading content.

Labels and utility text should use slightly increased letter spacing when needed, especially for navigation, small captions, or understated UI labels. The extracted design shows spaced-out small text in places, so `label-sm` can be used for subtle uppercase-like emphasis even when the text itself is not transformed.

## Layout

The layout is fluid and airy, with a strong editorial grid rather than a dense app-style interface. Use generous section spacing, roughly following the 8px-based rhythm but with large jumps for major content blocks: `xs` for tight spacing, `sm` for internal grouping, `md` for section separation, and `xl` for major page transitions.

Content containers should feel wide and comfortable, with substantial outer padding and asymmetrical composition where imagery and text share a large horizontal split. The hero demonstrates a two-column structure with a very large text block on the left and a large image on the right. Maintain spacious margins and avoid compressing sections; the brand depends on breathing room.

## Elevation & Depth

The interface is mostly flat and depends on contrast, whitespace, and image treatment rather than shadows. Borders are minimal and subtle, used primarily as separators in cards or utility surfaces. When depth is needed, prefer tonal layering and image contrast over shadow-heavy effects.

Use inset or hairline treatment sparingly, following the light `border` token and the subtle separation seen in cards. The visual hierarchy should come from scale, spacing, and color contrast first, not from elevation.

## Shapes

The overall shape language is soft but restrained. Corners are modestly rounded, with `rounded.sm` for buttons and `rounded.md` for cards, keeping the system approachable without feeling pill-heavy or whimsical. Full rounding should be reserved for chips or tiny decorative UI elements.

Avoid aggressive curves or highly sculpted forms. The brand feels modern, structured, and slightly institutional, so small radii and clean rectangles are the most on-brand choice.

## Components

**Buttons**
- Use `button-primary` for the main CTA. It should be lime (`colors.primary`) with dark text (`colors.primary-dark`), 16px/60px padding, and a compact 50px height.
- Use `button-secondary` for secondary actions. Keep it transparent with a charcoal outline/text treatment.
- Use `button-tertiary` for simple links or minimal actions where a border would feel too heavy.
- Button text should remain clear and modest in weight; avoid bold, all-caps button labels unless the content specifically calls for it.
- Hover states should stay subtle. A slight tonal shift or border emphasis is enough; avoid glow, shadow, or animated depth effects.

**Cards**
- Use `card` for content modules and information blocks. Cards are white, lightly bordered, and softly rounded with `rounded.md`.
- Keep card padding compact but not cramped, matching the observed understated layout.
- Cards should not rely on shadow for separation; use borders and whitespace instead.

**Inputs**
- Inputs should feel clean and unobtrusive, with white surfaces, subtle borders, and `rounded.sm`.
- Favor the same body typography used elsewhere so form elements blend into the page rather than looking like a separate product layer.
- Focus states should be visible through color or border treatment, not heavy glow.

**Chips**
- Chips should use `chip` with a muted background and full pill rounding.
- Keep chips small and label-like, suitable for filters, tags, or status markers.

**Navigation**
- Top navigation links should use the same Poppins family at a regular weight and quiet spacing.
- Keep navigation simple and unadorned, matching the restrained header shown in the source.

**Media blocks**
- Large imagery is a core component of the system. Place images in wide rectangles with minimal framing so they can carry emotional and aspirational weight.
- Avoid decorative overlays unless they reinforce the futuristic wellness story already present in the imagery.

## Do's and Don'ts

- Do keep the page open and airy with large headline-to-body contrast.
- Do use the lime accent sparingly for primary actions and key highlights.
- Do prefer flat surfaces, light borders, and whitespace over shadows or layered elevation.
- Do keep typography light in body copy and strong in headlines.
- Don't introduce saturated accent colors beyond the primary lime unless absolutely necessary.
- Don't crowd sections with dense cards, dense menus, or tight vertical rhythm.
- Don't over-round elements; avoid pill-shaped buttons unless they are truly chips.
- Don't use heavy black text or heavy drop shadows that would fight the calm editorial tone.