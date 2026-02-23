---
layout: default
title: SCSS Functions
description: Generate SCSS functions from SVG assets using svgpack. Convert SVG files into reusable Sass functions with dynamic color support.
nav_order: 6
permalink: /scss-functions/
---

# SCSS Functions

For projects that use SCSS, you can generate functions instead of CSS variables:

```bash
svgpack my-icon-folder/ --sass
```

## Example

```bash
svgpack test/assets/svgpack-imagotype.svg --sass
```

Outputs:

```scss
@function svgpack-imagotype($color:rgb(5, 4, 4)) {
  $color: str-replace(inspect($color), "#", "%23");
  @return url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 440 90'%3E%3Cg fill='"+$color+"' fill-rule='evenodd'%3E%3Cpath ...");
}
```

Usage:

```scss
$color: #fff;

.svgpack-main-logo {
  display: block;
  width: 36rem;
  height: 6rem;
  background: svgpack-imagotype($color) center/contain no-repeat;
}
```

**Note:** SCSS functions support color parameters, while CSS variables have fixed colors. Both approaches have their advantages depending on your project setup.
