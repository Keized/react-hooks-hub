# @react-hook-ts/use-media-query

`@react-hook-ts/use-media-query` is a custom React hook that provides the state of the screen's device type (desktop, tablet, mobile) and orientation (portrait, landscape). It's designed to create responsive interfaces and adapt content based on screen size.

## Installation

Use your preferred package manager to install `@react-hook-ts/use-media-query`:

```bash
npm install @react-hook-ts/use-media-query
# or
yarn add @react-hook-ts/use-media-query
```

## Usage

Import and use the useMediaQuery hook in your component:

```JSX
import React from 'react';
import { useMediaQuery } from '@react-hook-ts/use-media-query';

const MyComponent = () => {
  const { device, orientation } = useMediaQuery();

  return (
    <div>
      <p>Device: {device}</p>
      <p>Orientation: {orientation}</p>
    </div>
  );
};

export default MyComponent;
```

## Options

You can customize the behavior of the hook by passing options when using it:

```jsx
const { device, orientation } = useMediaQuery({
  breakpoints: { desktop: 1200, tablet: 768, mobile: 0 },
  debounceDelay: 300
});
```

- breakpoints: An object defining the breakpoints for each device type. By default, breakpoints are set for desktop, tablet, and mobile.
- debounceDelay: Debounce delay to limit frequent calls during window resizing.


## Examples
Custom Screen Sizes
You can define custom screen sizes in the breakpoints option:

```jsx
Copy code
const { device } = useMediaQuery({
  breakpoints: { desktop: 1200, tablet: 768, mobile: 0, custom: 1500 }
});

// Usage in JSX
{device === 'custom' && <p>Custom screen size</p>}
```


## License

MIT