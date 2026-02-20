---
layout: default
title: Home
description: Convert SVG files into CSS variables and ready-to-use classes
nav_order: 1
permalink: /
markdown: kramdown
kramdown:
  parse_block_html: true
---

<div class="svgpack-mask main-logo-svgpack" aria-label="svgpack logo"></div>

[![npm](https://img.shields.io/npm/v/@artero/svgpack.svg?style=flat-square)](https://www.npmjs.com/package/@artero/svgpack)


`svgpack` converts SVG files into CSS variables and ready-to-use classes.

It optimizes and sanitizes SVGs and generates CSS variables for direct use, plus optional CSS classes for easy implementation. Perfect for modern web development with frameworks like Remix, NextJS, and vanilla CSS.

**Why CSS Variables over Direct SVG?**

Instead of embedding SVG code directly in your HTML (which downloads the entire SVG content on every page load), svgpack converts SVGs into CSS variables that are:

- **Cached once**: CSS variables are downloaded once and cached by the browser, reducing bandwidth usage
- **Reusable**: Same SVG can be used multiple times without duplicating content
- **Smaller HTML**: No inline SVG code cluttering your HTML markup
- **Better performance**: Faster page loads since SVG content isn't repeated in every HTML document
- **Easier maintenance**: Update SVG once in CSS, changes apply everywhere

**Additional Advantages:**

- Fewer requests for resources on the server
- Less management problems with the assets of the css
- CSS variables are native and work in all modern browsers
- Ready-to-use CSS classes for instant implementation
- Perfect for component-based frameworks like React, Vue, Angular
- Easy to use with CSS-in-JS libraries
- No build step required for CSS variables
- Flexible sizing and coloring with CSS custom properties
- It is much faster to update all resources, save the svg

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
> The old package is deprecated and will no longer receive updates.

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