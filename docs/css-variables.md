---
layout: default
title: CSS Variables
description: Learn how to convert SVG assets into reusable CSS variables with svgpack. Generate background and mask utility classes for scalable icon and logo workflows.
nav_order: 6
permalink: /css-variables/
---

# CSS Variables Usage

## Simple Example

Running `svgpack` against [this svg file](https://github.com/javierartero/svgpack/blob/main/test/assets/svgpack-imagotype.svg):

```bash
svgpack test/assets/svgpack-imagotype.svg
```

Outputs:

```css
:root {
  --svgpack-imagotype: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='440' height='90' viewBox='0 0 440 90'%3E%3Cg fill='%23EF1625' fill-rule='evenodd'%3E%3Cpath ...");
}
```

Usage:

```css
.svgpack-main-logo {
  display: block;
  width: 36rem;
  height: 6rem;
  background: var(--svgpack-imagotype) center/contain no-repeat;
}
```

## Live Example

See a working example on CodePen: [SVG to CSS Variables Demo](https://codepen.io/JavierArtero/pen/JoGEeBq)

## CSS Classes Usage

Generate ready-to-use CSS classes with the `--background` and `--mask` flags:

```bash
# Generate CSS variables with background and mask classes
svgpack my-images/ --background --mask

# Generate with custom class names
svgpack my-images/ --background my-image --mask my-mask
```

This generates CSS classes that make it super easy to use your images:

```css
:root {
  --my-logo: url("data:image/svg+xml,...");
  --my-icon: url("data:image/svg+xml,...");
}

.svgpack-background {
  background: var(--image) center/contain no-repeat;
  background-size: 100% 100%;
  width: var(--image--width, 1em);
  height: var(--image--height, 1em);
}

.svgpack-mask {
  background-color: var(--image--color, currentColor);
  mask: var(--image) center/contain no-repeat;
  mask-size: 100% 100%;
  width: var(--image--width, 1em);
  height: var(--image--height, 1em);
}
```

## HTML Usage

Simply add the class to any element:

```html
<!-- Background usage -->
<div class="svgpack-background" style="--image: var(--my-logo)"></div>

<!-- Mask usage (great for colored icons) -->
<div class="svgpack-mask" style="--image: var(--my-icon); --image--color: #ff0000"></div>

<!-- Custom sizing -->
<div class="svgpack-background" style="--image: var(--my-logo); --image--width: 2em; --image--height: 2em"></div>
```

For **Tailwind v4** integration (native `@theme` and `@utility` output), see [Tailwind v4](/tailwind-v4/).

## Advanced Usage

CSS variables work great with modern frameworks:

```jsx
// React component
const Image = ({ name, className, type = 'background' }) => {
  const imageStyle = { '--image': `var(--${name})` };
  return (
    <div 
      className={`svgpack-${type} ${className}`}
      style={imageStyle}
    />
  );
};

// Usage
<Image name="my-logo" type="background" className="w-6 h-6" />
<Image name="my-icon" type="mask" className="text-red-500" />
```

```vue
<!-- Vue component -->
<template>
  <div 
    :class="`svgpack-${type}`"
    :style="getImageStyle()"
  />
</template>

<script>
export default {
  methods: {
    getImageStyle() {
      return { '--image': `var(--${this.imageName})` };
    }
  }
}
</script>
```
