---
layout: default
title: SVG to CSS & Tailwind
description: Convert SVG icons to CSS variables and Tailwind v4 utilities. SVG to CSS and Tailwind SVG generator for modern web apps
nav_order: 1
permalink: /
markdown: kramdown
kramdown:
  parse_block_html: true
---

<div class="svgpack-mask main-logo-svgpack" aria-label="svgpack logo"></div>

<h1>Generate CSS variables and Tailwind v4 tokens from SVG assets</h1>
<h2>SVG to CSS and Tailwind SVG utilities for modern frameworks</h2>

svgpack is an SVG to CSS converter and Tailwind SVG generator for modern frontend stacks.
It turns your SVG icons and logos into reusable CSS variables and Tailwind v4 utilities,
so you can use them as design tokens across React, Next.js, Remix, Vue, or plain CSS
without duplicating inline SVG markup.

[![npm](https://img.shields.io/npm/v/@artero/svgpack.svg?style=flat-square)](https://www.npmjs.com/package/@artero/svgpack)

`svgpack` is a CLI tool that converts SVG assets into reusable CSS variables, optional utility classes, and native Tailwind v4 @theme tokens for scalable design systems.

It optimizes and sanitizes SVGs, centralizing them in your stylesheet instead of duplicating markup across components. Designed for modern workflows with frameworks like Remix, Next.js, and vanilla CSS.

Use svgpack when you are looking for an SVG to CSS workflow, a Tailwind SVG utility generator, or a way to turn an icons folder into reusable frontend tokens that can be shared across components and pages.

**Why CSS Variables over Direct SVG?**

Instead of duplicating inline SVG markup across components and pages, svgpack converts SVG assets into centralized CSS variables that:

- **Avoid duplicated markup**: SVG definitions live in CSS instead of being repeated inline
- **Are cached once**: The generated stylesheet is cached by the browser
- **Keep HTML cleaner**: No large `<svg>` blocks embedded in templates
- **Encourage reuse**: The same asset can be used consistently across the application
- **Simplify updates**: Update the SVG once and changes propagate everywhere

**Additional Advantages:**

- Reduced HTML size and duplication
- Centralized asset management
- Native CSS custom properties (no runtime required)
- Optional background and mask utility classes
- Compatible with modern frameworks (React, Vue, Angular)
- Optional Tailwind v4 native integration
- Flexible sizing and coloring via CSS custom properties

## Table of Contents

- [Quick Start](https://svgpack.javierartero.com/quick-start/)
- [CLI Usage](https://svgpack.javierartero.com/cli-usage/)
- [CSS Variables Usage](https://svgpack.javierartero.com/css-variables/)
- [SCSS Functions](https://svgpack.javierartero.com/scss-functions/)
- [React Components](https://svgpack.javierartero.com/react-components/)
- [Installation](https://svgpack.javierartero.com/installation/)

## Quick Start

### Install as Project Dependency (Recommended)

```bash
npm install -D @artero/svgpack
```

> ⚠️ Previously published as `@marsbased/svgpack`.  
> The package has moved to `@artero/svgpack`.

### CLI Usage

```bash
# Basic usage - generate CSS variables
svgpack my-images/ > images.css

# With ready-to-use classes
svgpack my-images/ --background --mask > images.css

# SCSS functions instead of CSS variables
svgpack my-images/ --sass > images.scss

# Get help
svgpack --help
```

**Example output:**
```css
:root {
  --my-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'...");
  --my-logo: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'...");
}
```

## Typical use cases

- Convert an SVG icon set into CSS variables for a design system.
- Generate Tailwind CSS v4 utilities for icons, logos, and brand assets.
- Replace repeated inline SVG markup in React, Next.js, Remix, or Vue apps.
- Keep SVG assets centralized in stylesheets so they are easier to cache and reuse.

## FAQ

### Is svgpack a good fit for documentation sites?

Yes. Documentation sites often repeat icons, logos, and UI illustrations across many pages. svgpack helps move those assets into CSS variables or utility classes so the markup stays smaller and easier to maintain.

### Can svgpack generate Tailwind CSS utilities from SVG files?

Yes. Use the `--tailwind` flag to generate native Tailwind CSS v4 `@theme` and `@utility` output. The full setup is documented in [Tailwind v4](https://svgpack.javierartero.com/tailwind-v4/).

### When should I use CSS variables instead of SCSS functions?

Use CSS variables when you want runtime-friendly reuse with standard CSS. Use SCSS functions when your project already relies on Sass and you want compile-time color arguments. Compare both approaches in [CSS Variables Usage](https://svgpack.javierartero.com/css-variables/) and [SCSS Functions](https://svgpack.javierartero.com/scss-functions/).
