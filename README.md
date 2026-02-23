# [![svgpack](https://raw.githubusercontent.com/javierartero/svgpack/main/docs/svgpack-logo.svg)](https://svgpack.javierartero.com)

[![npm](https://img.shields.io/npm/v/@artero/svgpack.svg?style=flat-square)](https://www.npmjs.com/package/@artero/svgpack)

## Documentation

📖 **[View Full Documentation](https://svgpack.javierartero.com)**

`svgpack` converts SVG files into CSS variables and ready-to-use classes.

It optimizes and sanitizes SVGs and generates CSS variables for direct use, plus optional CSS classes for easy implementation. Perfect for modern web development with frameworks like Angular, NextJS, and vanilla CSS.

**Why CSS Variables instead of inline SVG?**

Inlining SVG directly into your HTML duplicates markup across pages and components.  
svgpack converts SVG assets into CSS variables that:

- **Avoid duplicated markup**: SVG definitions live in CSS, not repeated in every component.
- **Are cached once**: The stylesheet is cached by the browser.
- **Keep HTML cleaner**: No large inline `<svg>` blocks in your templates.
- **Encourage reuse**: The same asset can be used consistently across the application.
- **Simplify updates**: Update the SVG once and the change propagates everywhere.

**Additional Advantages:**

- Reduced HTML size and duplication
- Centralized asset management
- Native CSS custom properties (no runtime required)
- Ready-to-use utility classes
- Works seamlessly with modern frameworks (React, Vue, Angular)
- Optional Tailwind v4 native integration

## Table of Contents

- [Quick Start](https://svgpack.javierartero.com/quick-start/)
- [CLI Usage](https://svgpack.javierartero.com/cli-usage/)
- [CSS Variables Usage](https://svgpack.javierartero.com/css-variables/)
- [Tailwind v4](https://svgpack.javierartero.com/tailwind-v4/)
- [SCSS Functions](https://svgpack.javierartero.com/scss-functions/)
- [React Components](https://svgpack.javierartero.com/react-components/)
- [Installation](https://svgpack.javierartero.com/installation/)

## Quick Start

### Install as Project Dependency (Recommended)

```bash
npm install -D @artero/svgpack
```

⚠️ **Previously published as @marsbased/svgpack.** The old package is deprecated and will no longer receive updates.

### CLI Usage

```bash
# Basic usage - generate CSS variables
svgpack my-images/ > images.css

# With ready-to-use classes
svgpack my-images/ --background --mask > images.css

# SCSS functions instead of CSS variables
svgpack my-images/ --sass > images.scss

# Tailwind v4 native output
svgpack my-images/ --tailwind > theme.css

# Get help
svgpack --help
```

## Credits

Originally developed at [MarsBased](https://github.com/orgs/MarsBased) by [Danigb](https://github.com/danigb) and [Javier Artero](https://github.com/javierartero).
Now maintained independently.

## License

MIT License