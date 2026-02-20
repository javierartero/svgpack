---
layout: default
title: React Components
nav_order: 7
permalink: /react-components/
---

# React Components

svgpack includes ready-to-use React components for easy integration:

## Usage

```jsx
import { SvgpackMask, SvgpackBackground } from '@artero/svgpack';

// SvgpackMask component (great for colored icons)
<SvgpackMask
  image="my-icon"
  width="24px"
  height="24px"
  className="text-blue-500"
/>

// SvgpackBackground component
<SvgpackBackground
  image="my-logo"
  width="100%"
  height="200px"
  className="bg-gray-100"
/>
```

## Component Props

### SvgpackMask & SvgpackBackground

Both components accept the following props:

- `image?: string` - The name of the SVG variable (without the `--` prefix)
- `width?: string` - CSS width value (e.g., "24px", "100%", "2rem")
- `height?: string` - CSS height value (e.g., "24px", "200px", "3rem")
- `className?: string` - Additional CSS classes
- `style?: React.CSSProperties` - Inline styles
- `children?: React.ReactNode` - Child elements
- All standard HTML div attributes

## TypeScript Support

The components are fully typed and include TypeScript definitions:

```tsx
import { SvgpackMask, SvgpackBackground } from '@artero/svgpack';

interface MyComponentProps {
  iconName: string;
  size?: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ iconName, size = "24px" }) => (
  <SvgpackMask
    image={iconName}
    width={size}
    height={size}
    className="text-primary"
  />
);
```
