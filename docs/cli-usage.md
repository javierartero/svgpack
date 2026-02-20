---
layout: default
title: CLI Usage
nav_order: 3
permalink: /cli-usage/
---

# CLI Usage

## Basic Usage

```bash
# Generate CSS variables
svgpack my-images/

# Save to file
svgpack my-images/ > images.css
```

## CSS Classes Mode

Generate CSS variables with ready-to-use classes:

```bash
# Generate with default class names
svgpack my-images/ --background --mask

# Generate with custom class names
svgpack my-images/ --background my-image --mask my-mask > images.css
```

## SCSS Functions Mode

Generate SCSS functions instead of CSS variables:

```bash
# Generate SCSS functions
svgpack my-images/ --sass > images.scss
```

## Tailwind v4 mode

Generate output for Tailwind v4 (`@theme` and `@utility`):

```bash
svgpack my-icons/ --tailwind > svgpack.css
```

Use `--prefix <name>` to customize variable names (e.g. `--prefix icons` → `--icons-icon-search`). See [Tailwind v4](/tailwind-v4/) for details.

## CLI Options

- `--background [className]` - Generate background CSS classes
- `--mask [className]` - Generate mask CSS classes
- `--tailwind` - Generate Tailwind v4 native output (`@theme` and `@utility`)
- `--prefix <name>` - Prefix for generated CSS variables (default: none in CSS mode; `svgpack` in `--tailwind` mode). Sanitized for CSS (e.g. spaces → hyphens).
- `--sass` - Generate SCSS functions instead of CSS variables
- `--help` - Show help information

Write `svgpack --help` for more options
