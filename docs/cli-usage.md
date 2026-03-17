---
layout: default
title: CLI Usage
description: Complete CLI reference for svgpack. Learn how to convert SVG folders into CSS variables, Tailwind CSS v4 utilities, background classes, mask classes, or SCSS functions.
nav_order: 3
permalink: /cli-usage/
---

# CLI Usage

Use the `svgpack` CLI when you want to convert one SVG file or an entire icons folder into CSS-native assets. The command can generate plain CSS variables, ready-to-use background and mask classes, Tailwind CSS v4 utilities, or Sass functions depending on the output mode you need.

## Basic Usage

```bash
# Generate CSS variables
svgpack my-images/

# Save to file
svgpack my-images/ > images.css
```

If you are starting from scratch, follow the [Quick Start](/quick-start/) guide first.

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

## Common workflows

### Convert an SVG icon folder into CSS variables

```bash
svgpack src/assets/icons > src/styles/icons.css
```

### Generate classes for logos and UI icons

```bash
svgpack src/assets/svg --background --mask > src/styles/svgpack.css
```

### Generate Tailwind CSS v4 utilities from SVG assets

```bash
svgpack src/assets/icons --tailwind --prefix brand > src/styles/svgpack-theme.css
```

### Generate Sass functions from SVG files

```bash
svgpack src/assets/icons --sass > src/styles/_svgpack.scss
```

See also [CSS Variables](/css-variables/), [SCSS Functions](/scss-functions/), [React Components](/react-components/), and [Installation](/installation/).
