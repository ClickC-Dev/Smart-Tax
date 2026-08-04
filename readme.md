# Smart Tax — Design System

Design system da **Smart Tax Contabilidade**, uma contabilidade online de alto padrão, voltada a pequenas e médias empresas (PJ) e clientes MEI. O sistema foi construído a partir da marca (logo) do cliente, definindo tokens visuais, componentes e telas de referência para os dois produtos do negócio: o portal do cliente e o site institucional.

## Produtos modelados
1. **Portal do cliente** (`ui_kits/dashboard/`) — o painel de contabilidade online: visão geral, notas fiscais e documentos, declarações e configurações.
2. **Site institucional** (`ui_kits/website/`) — página pública: cabeçalho, hero, serviços, planos e rodapé.

## Diretrizes de conteúdo
- **Idioma**: português do Brasil.
- **Tratamento**: segunda pessoa, direto — "você", "sua empresa".
- **Tom**: formal, consultivo, transmitindo confiança — sem informalidade excessiva.
- **Grafia**: sentence case em textos e botões ("Enviar documento"); o único destaque em caixa alta é o rótulo com letter-spacing largo herdado da marca, usado só em pequenos "eyebrows" de seção.
- **Sem emojis** em textos de produto ou marketing.
- **Números/valores**: sempre em formato brasileiro, `R$ 48.200,00`, com datas `DD/MM/AAAA`.

## Fundamentos visuais
- **Paleta**: navy profundo (`--navy-800 #1c2e38`) como superfície dominante da marca (cabeçalhos, barras laterais, seções de destaque); dourado/bronze (`--gold-500 #c39b6c`) como acento único — reservado para a ação de maior destaque de cada tela, estados ativos e rótulos pequenos. Neutros quentes (`--neutral-50…900`) compõem as superfícies claras (corpo do painel, cards, tabelas), evitando cinza puro.
- **Tipografia**: dois sistemas de fonte. **Manrope** (extrabold/800) para títulos e destaques; **Inter** para corpo de texto, rótulos de formulário e dados de tabela.
- **Fundos**: cor sólida apenas — sem gradientes, fotografia, texturas ou ilustração.
- **Cards**: cantos de `var(--radius-lg)` (14px), borda sutil de 1px, sombra suave. Cards em destaque (ex.: plano em evidência) recebem borda dourada de 2px.
- **Botões**: cantos de `var(--radius-sm)` (6px) — mais retos que os cards. Navy sólido para ação primária; dourado sólido para a ação de maior destaque da tela; contorno/ghost para ações secundárias.
- **Bordas/divisores**: hairlines de 1px, sem cards com borda colorida lateral.
- **Sombras**: suaves, baixa opacidade, com tom navy.
- **Raios de canto**: escala pequena e consistente — 4/6/10/14/20px, totalmente arredondado só em pills (tags, switches, avatares).
- **Animação**: mínima — transições de 120–320ms em hover/foco/toggle, sem efeitos chamativos.
- **Estados de hover**: escurece um passo do token (`--accent-primary` → `--accent-primary-hover`); botões secundários/ghost ganham leve tonalidade de fundo.
- **Transparência/blur**: usado só no scrim de modais.
- **Imagens**: fotografia neutra, tons frios, estilo editorial, condizente com o posicionamento de alto padrão.

## Iconografia
Ícones via [Lucide](https://lucide.dev) — traço fino de 1.5–2px, cantos levemente arredondados. Usados entre 16–28px, na cor `--text-muted` (uso inline/secundário) ou `--gold-600` (destaques). Sem emojis ou glifos unicode como ícone.

## Fontes
Google Fonts — **Manrope** (400–800) e **Inter** (400–700), carregadas via `@import` em `tokens/typography.css`.

## Estrutura do repositório
- `styles.css` — stylesheet raiz (apenas imports)
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radii.css`, `shadows.css`
- `assets/` — `logo-source.png`, `logo-full.png` (lockup), `logo-mark.png` (marca isolada)
- `guidelines/` — cartões de especificação: cores, tipografia, espaçamento, raios e sombras, marca, iconografia
- `components/`
  - `buttons/` — Button (primary, gold, secondary, ghost, outlineInverse)
  - `forms/` — Input, Select, Checkbox, Radio, Switch
  - `data-display/` — Card, Badge, Tag
  - `navigation/` — Tabs
  - `feedback/` — Dialog, Toast, Tooltip
- `ui_kits/`
  - `dashboard/` — portal do cliente (Início, Notas & Documentos, Declarações, Configurações)
  - `website/` — página inicial do site institucional (cabeçalho, hero, serviços, planos, rodapé)
- `SKILL.md` — definição portátil do skill para uso no Claude Code

## Padrão de componentes
O conjunto padrão de componentes (Button, Input, Select, Checkbox, Radio, Switch, Card, Badge, Tag, Tabs, Dialog, Toast, Tooltip) foi definido sob medida para os dois produtos modelados — nada além do necessário para eles.

---

Feito por **ClickC**.
