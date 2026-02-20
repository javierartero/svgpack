---
layout: default
title: Quick Start
nav_order: 2
permalink: /quick-start/
---

# Quick Start

## Install as Project Dependency (Recommended)

```bash
npm install @artero/svgpack
```

## CLI Usage

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

## Build Scripts

Add to your `package.json` scripts:
```json
{
  "scripts": {
    "build:svg": "svgpack src/shared/assets/svg > src/styles/_svgpack.css --mask --background",
  }
}
```

Then run:
```bash
npm run build:svg
```

## Global Installation (Alternative)

```bash
npm install --global @artero/svgpack
```

## React Components (Optional)

```jsx
import { SvgpackMask, SvgpackBackground } from '@artero/svgpack';

// Use as React components
<SvgpackMask image="my-icon" width="24px" height="24px" className="text-blue-500" />
<SvgpackBackground image="my-logo" width="100%" height="200px" />
```
