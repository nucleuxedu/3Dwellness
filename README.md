# 3D Wellness

A spacious, editorial nonprofit website built with **Next.js Pages Router** and **MUI**, following the design system in `prompt.md`.

## Stack

- Next.js 14 (Pages Router)
- React 18
- MUI 6 + Emotion
- Tailwind CSS (for Skiper / Vengeance components; preflight disabled so MUI stays intact)
- TypeScript
- Poppins (Google Fonts)

## Motion libraries

- **Vengeance UI** — `reveal-loader`, `stagger-text`, `stats-counter`, `line-hover-link`, `border-beam`, `flip-fade-text` via shadcn registry
- **Skiper UI** — animated links (`skiper40`) and `useLoop` (`skiper62`) via shadcn registry
- **Animaster-style layer** — GSAP scroll reveals, parallax media, and magnetic hover in `lib/animaster/` (Animaster Lib itself is a paid Drive pack, not an npm package; these patterns mirror its GSAP scroll/hover language)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route       | Purpose                          |
|-------------|----------------------------------|
| `/`         | Home — hero, programs, impact CTA |
| `/about`    | Mission and values               |
| `/programs` | Program detail listings          |
| `/impact`   | Outcomes and stories             |
| `/contact`  | Contact form                     |
| `/donate`   | Donation amount selector         |

## Design tokens

Colors, typography, spacing, and component styles are implemented in `theme/theme.ts` from `prompt.md` (lime accent `#B5C94D`, charcoal text, white surfaces, oversized Poppins headlines).
