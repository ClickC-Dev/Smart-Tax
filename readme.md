# Smart Tax Design System

Design system for **Smart Tax Contabilidade** — a high-end ("alto padrão") online accounting service in Brazil, serving small/medium businesses (PJ) and MEI clients. No codebase, Figma file, or existing product screens were provided; this system was built from a single source: the brand logo (`uploads/🏠🎨1️⃣ - Logo Cliente (1).png`, copied to `assets/logo-full.png`). Everything else — components, screens, tokens — was designed from scratch to match that mark's visual language, then confirmed with the user via a short calibration Q&A (tone: formal/banking-grade; language: Portuguese-BR; surfaces: client dashboard + marketing site; components: standard set).

**Sources**: no repo, Figma link, or deck attached. If one becomes available, re-run against it — the component inventory and screens here are original interpretations, not extracted from an existing product.

## Products modeled
1. **Client dashboard** (`ui_kits/dashboard/`) — the online accounting portal a business owner logs into: overview, documents/notas fiscais, declarações (tax filings), settings.
2. **Marketing website** (`ui_kits/website/`) — public site: header, hero, services, pricing plans, footer.

## Content fundamentals
- **Language**: Portuguese (Brazil).
- **Person**: second person, direct address — "você", "sua empresa" (never third-person or royal "we" alone).
- **Tone**: formal, reassuring, consultative — banking-grade confidence, not casual or playful. Example: "Cuidamos de toda a rotina fiscal da sua empresa — impostos, notas e obrigações — para que você tenha clareza e tranquilidade todos os meses."
- **Casing**: sentence case for body copy and buttons ("Enviar documento", not "ENVIAR DOCUMENTO"); the one exception is the tracked-uppercase micro-label motif lifted from the logo (e.g. "CONTABILIDADE", "SOB CONSULTA"-style eyebrow tags), used sparingly for section labels/eyebrows only.
- **No emoji** anywhere in product or marketing copy — matches the logo's formal, precision-metal-and-wood aesthetic.
- **Numbers/money**: always formatted as Brazilian currency, `R$ 48.200,00`, with dates as `DD/MM/AAAA`.

## Visual foundations
- **Palette**: deep navy (`--navy-800 #1c2e38`, sampled directly from the logo background) as the dominant brand surface for headers, sidebars, and hero moments; warm gold/bronze (`--gold-500` `#c39b6c` family, sampled from the mark's wood-grain triangle) as the singular accent — used for the one highlighted action per screen, active-state indicators, and small eyebrow labels. Warm off-white neutrals (`--neutral-50…900`) carry the light-mode UI (dashboard body, cards, tables) rather than pure gray, to stay warm/premium instead of cold/corporate. Max two background colors per composition: navy or warm-white, never both competing.
- **Type**: two-family system. **Manrope** (extrabold/800) for display and headings — a geometric, confident sans that echoes the bold wordmark. **Inter** for body copy, form labels, table data — a neutral, highly legible workhorse. A tracked, uppercase, wide-letter-spaced (`--tracking-widest`, 0.18em) micro-label in gold directly quotes the logo's "CONTABILIDADE" subtitle treatment and small horizontal rule flourishes — reserve for section eyebrows, not body text.
- **Backgrounds**: flat color only — no gradients, no photography, no patterns/textures, no illustration. The logo itself is the only "textured" asset (its wood-grain triangle) and is never re-created or extended into UI chrome; it appears only as a logo lockup.
- **Cards**: `var(--radius-lg)` (14px) corners, 1px `--border-subtle` hairline, soft `--shadow-md` — restrained, not glossy. Highlighted cards (e.g. featured pricing plan) get a 2px gold border + `--shadow-gold-glow` instead of color fill.
- **Buttons**: `--radius-sm` (6px) — tighter than cards, deliberately less rounded than the "pill button" AI-slop default. Solid navy = primary action; solid gold = the one highest-priority action per view; outlined/ghost for secondary/tertiary.
- **Borders/dividers**: 1px hairlines (`--border-subtle` / `--border-default`) — no colored left-border accent cards.
- **Shadows**: soft, low-opacity, navy-tinted (not pure black) — `--shadow-sm/md/lg/xl` — elevation increases for modals/popovers only; flat elsewhere.
- **Corner radii**: small and consistent — 4/6/10/14/20px scale, full-round only for pills (tags, switches, avatars).
- **Animation**: minimal — 120–320ms ease-standard transitions on hover/focus/toggle only (color, border, shadow, position). No bounce, no fade-in-on-scroll, no parallax. This is a financial-trust product; motion should be invisible, not expressive.
- **Hover states**: darken by one token step (`--accent-primary` → `--accent-primary-hover`); ghost/secondary buttons gain a subtle background tint. No lightening, no scale-up.
- **Press states**: no shrink/scale effect used; rely on the darker hover tone holding through `:active`.
- **Transparency/blur**: used only for the modal scrim (`rgba(13,24,31,0.55)`) — no frosted-glass panels elsewhere.
- **Imagery**: none provided or invented. If/when the client supplies photography, expect neutral, cool-toned, editorial business photography (consistent with "alto padrão" positioning) — do not add stock photos speculatively.

## Iconography
No icon font, sprite, or SVG set was supplied with the brand. **Substitution**: [Lucide](https://lucide.dev) icons via CDN — thin 1.5–2px stroke, minimally rounded joins, closest match to the mark's precise geometric linework. Used at 16–28px, colored `--text-muted` (inline/secondary) or `--gold-600` (feature highlights). No emoji, no unicode glyphs as icons. Flagging this substitution — if the client has a preferred icon library, let us know and we'll swap it project-wide.

## Fonts
No webfont files were supplied. **Substitution**: Google Fonts CDN — **Manrope** (400–800) and **Inter** (400–700), loaded via `@import url(...)` in `tokens/typography.css`. Nearest match to the logo's bold geometric wordmark and thin tracked label. Flagging this substitution — if brand fonts exist, please upload the files and we'll self-host them via `@font-face`.

## Index
- `styles.css` — root stylesheet (imports only)
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radii.css`, `shadows.css`
- `assets/` — `logo-source.png` (as provided), `logo-full.png` (lockup), `logo-mark.png` (isolated triangle)
- `guidelines/` — specimen cards: colors (navy/gold/neutral/semantic), type (display/body/tracked label), spacing, radii & shadows, brand (logo, voice & tone), iconography
- `components/`
  - `buttons/` — Button (primary, gold, secondary, ghost, outlineInverse)
  - `forms/` — Input, Select, Checkbox, Radio, Switch
  - `data-display/` — Card, Badge, Tag
  - `navigation/` — Tabs
  - `feedback/` — Dialog, Toast, Tooltip
- `ui_kits/`
  - `dashboard/` — client accounting portal (Início, Notas & Documentos, Declarações, Configurações)
  - `website/` — marketing homepage (header, hero, services, plans, footer)
- `SKILL.md` — portable skill definition for use in Claude Code

## Intentional additions
No component source was provided, so the full standard set (Button, Input, Select, Checkbox, Radio, Switch, Card, Badge, Tag, Tabs, Dialog, Toast, Tooltip) was authored from scratch, sized to what the two modeled products need — nothing beyond that.

## Caveats — please help us iterate
- **No real product source.** Everything here (screens, copy, layout decisions) is an original interpretation built only from the logo — not extracted from an existing app, site, or Figma file. If Smart Tax has a live product or design file, attach it and we'll rebuild against ground truth.
- **Fonts and icons are substitutions** (Google Fonts: Manrope/Inter; Lucide icons) — flagged above. Send real brand font files and/or an icon set if they exist.
- **No photography** was supplied or invented — dashboard and marketing screens currently rely on flat color, type, and icons only.
