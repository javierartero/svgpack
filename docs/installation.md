---
layout: default
title: Installation
description: Learn how to install svgpack as a CLI tool, dev dependency, or React runtime dependency for generating CSS variables and Tailwind v4 utilities from SVG assets.
nav_order: 10
permalink: /installation/
markdown: kramdown
kramdown:
  parse_block_html: true
---

# Installation

## Recommended (Build-time usage)

Svgpack is primarily a CLI tool.  
Install it as a dev dependency in your project:

```bash
npm install -D @artero/svgpack
# or
yarn add -D @artero/svgpack
```

> ⚠️ Previously published as `@marsbased/svgpack`.  
> The package has moved to @artero/svgpack.

---

## Runtime Usage (React components)

If you import `SvgpackMask` or `SvgpackBackground` directly in your React application, install it as a regular dependency:

```bash
npm install @artero/svgpack
# or
yarn add @artero/svgpack
```

---

## Global CLI (Optional)

For one-off usage outside a project:

```bash
npm install -g @artero/svgpack
# or
yarn global add @artero/svgpack
```

