---
layout: default
title: Tailwind SVG Utilities (Tailwind CSS v4)
description: Integrate SVG assets with Tailwind CSS v4 using native @theme and @utility directives. Generate CSS variables and scalable utilities with svgpack.
nav_order: 5
permalink: /tailwind-v4/
---

# Tailwind SVG utilities for Tailwind CSS v4

svgpack can generate output tailored for **Tailwind v4**, using `@theme` and `@utility` so your SVG variables and utilities are consumed natively by Tailwind’s pipeline.

This page is for teams searching for a Tailwind CSS SVG workflow that does not rely on ad hoc inline markup. svgpack turns SVG icons and logos into native Tailwind v4 tokens and utilities, so the assets remain reusable across components.

## Generate Tailwind output

Use the `--tailwind` flag:

```bash
svgpack my-icons/ --tailwind > svgpack.css
```

Then import the file in your Tailwind setup (e.g. in your main CSS or via `@import` in Tailwind v4).

<a href="https://play.tailwindcss.com/z4448csf2i" target="_blank" rel="noopener noreferrer">Play Tailwind CSS Example</a>

## What you get

- **`@theme { ... }`** — Your SVG URLs are emitted as theme variables (e.g. `--svgpack-icon-search: url("...")`), so Tailwind can use them as design tokens.
- **`@utility svgpack-*`** — Maps the theme variable for the current utility to `--svgpack-image` (used by the mask and background utilities).
- **`@utility svgpack-mask`** — Mask-based icon utility (color, size, and dimensions configurable via CSS variables).
- **`@utility svgpack-bg`** — Background-based image utility.

Unused utilities are tree-shaken from the final CSS, so all of them can be emitted without affecting bundle size.

## Prefix

In Tailwind mode, variable names use the **`svgpack`** prefix by default (e.g. `--svgpack-icon-search`). This avoids collisions with other theme tokens.

You can override the prefix with `--prefix`:

```bash
# Custom prefix for variable names
svgpack my-icons/ --tailwind --prefix icons > svgpack.css
```

This produces variables like `--icons-icon-search`. The `--prefix` option applies in **all modes** (standard CSS and Tailwind). Prefix values are sanitized for use in CSS: spaces become hyphens, and invalid characters are removed.

## Using the utilities

Set the image (and optional overrides) with CSS variables, then apply the utility class:

```html
<div class="svgpack-mask svgpack-icon-search size-6 text-neutral-500"></div>

<div 
  class="svgpack-bg svgpack-my-logo" 
  style="--svgpack-width:300px;--svgpack-height:140px;"
></div>
```

Variables like `--image`, `--image--color`, `--image--width`, and `--image--height` are supported for backward compatibility; the new prefixed names (e.g. `--svgpack-color`, `--svgpack-width`) are the recommended API going forward.

## Typical Tailwind use cases

- Build an icon system from an SVG folder and expose it as Tailwind utilities.
- Render monochrome icons with masks so color can be controlled with Tailwind text classes.
- Render logos or illustrations with background utilities and explicit dimensions.
- Keep SVG asset definitions inside the stylesheet instead of repeating inline SVG in templates.

## Related guides

- Start with [Quick Start](/quick-start/) if you have not installed svgpack yet.
- See [CLI Usage](/cli-usage/) for command options like `--prefix`.
- See [CSS Variables](/css-variables/) if your project does not use Tailwind.
