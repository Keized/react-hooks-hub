
<h1 align="center">Use Throttle</h1>

<p align="center">
  `@react-hooks-hub/use-throttle` hook allows you to throttle the execution of a function.
  Throttling is a technique used to limit the rate at which a function can be called, making it especially useful in scenarios where you want to control how frequently certain actions are performed (ex: check the cursor position). 
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@react-hooks-hub/use-throttle" title="use-throttle on NPM">
  <img src="https://img.shields.io/npm/v/@react-hooks-hub/use-throttle.svg?style=for-the-badge" alt="NPM version" />
  </a>
  <img src="https://img.shields.io/github/actions/workflow/status/Keized/react-hooks-hub/use-throttle.yml?style=for-the-badge" alt="CI status" />
  &nbsp;
  <img src="https://img.shields.io/codecov/c/github/keized/react-hooks-hub?flag=use-throttle&style=for-the-badge" alt="Coverage" />
  &nbsp;
  <img src="https://img.shields.io/bundlephobia/minzip/@react-hooks-hub/use-throttle?style=for-the-badge" alt="Bundlephobia" />
  &nbsp;
</p>



# @react-hooks-hub/use-throttle


## Installation

Use your preferred package manager to install `@react-hooks-hub/use-throttle`:

```bash
npm install @react-hooks-hub/use-throttle
# or
yarn add @react-hooks-hub/use-throttle
```

## Usage

Import and use the throttle hook in your component:

```JSX
import React, { useState } from 'react';
import { useThrottle } from '@react-hooks-hub/use-throttle';

function CursorPositionTracker() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Create a throttled version of the function to update cursor position
  const updateCursorPosition = useThrottle((e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  }, 100); // Throttle to 100ms

  // Attach an event listener to track cursor movement
  const handleMouseMove = (e) => {
    updateCursorPosition(e);
  };

  return (
    <div>
      <h1>Cursor Position Tracker</h1>
      <p>Move your mouse around to see the cursor's position:</p>
      <div
        onMouseMove={handleMouseMove}
        style={{
          width: '300px',
          height: '300px',
          border: '1px solid #ccc',
          padding: '10px',
        }}
      >
        <p>Cursor X: {cursorPosition.x}</p>
        <p>Cursor Y: {cursorPosition.y}</p>
      </div>
    </div>
  );
}

export default CursorPositionTracker;
```

