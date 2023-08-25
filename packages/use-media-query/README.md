
<h1 align="center">Use Media Query</h1>
<br />

<p align="center">
  <strong>@react-hooks-hub/use-media-query</strong> is a custom React hook that provides the state of the screen's device type (desktop, tablet, mobile) and orientation (portrait, landscape). It's designed to create responsive interfaces and adapt content based on screen size.
</p>

<br />

<p align="center">
  <a href="https://www.npmjs.com/package/@react-hooks-hub/use-media-query" title="use-media-query on NPM">
  <img src="https://img.shields.io/npm/v/@react-hooks-hub/use-media-query.svg?style=for-the-badge" alt="NPM version" />
  </a>
  &nbsp;
  <img src="https://img.shields.io/github/actions/workflow/status/Keized/react-hooks-hub/use-media-query.yml?style=for-the-badge" alt="CI status" />
  &nbsp;
  <img src="https://img.shields.io/codecov/c/github/keized/react-hooks-hub?flag=use-media-query&style=for-the-badge" alt="Coverage" />
  &nbsp;
  <img src="https://img.shields.io/bundlephobia/minzip/@react-hooks-hub/use-media-query?style=for-the-badge" alt="Bundlephobia" />
  &nbsp;
</p>

<br />
<br />

## Installation

Use your preferred package manager to install `@react-hooks-hub/use-media-query`:

```bash
npm install @react-hooks-hub/use-media-query
# or
yarn add @react-hooks-hub/use-media-query
```

## Usage

Import and use the useMediaQuery hook in your component:

```JSX
import React from 'react';
import { useMediaQuery } from '@react-hooks-hub/use-media-query';

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
const { device } = useMediaQuery({
  breakpoints: { desktop: 1200, tablet: 768, mobile: 0, custom: 1500 }
});

// Usage in JSX
{device === 'custom' && <p>Custom screen size</p>}
```


## License

MIT
