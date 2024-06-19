
<h1 align="center">Use Dark Mode</h1>

<p align="center">
  `@react-hooks-hub/use-dark-mode` 
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@react-hooks-hub/use-dark-mode" title="use-dark-mode on NPM">
  <img src="https://img.shields.io/npm/v/@react-hooks-hub/use-dark-mode.svg?style=for-the-badge" alt="NPM version" />
  </a>
  <img src="https://img.shields.io/github/actions/workflow/status/Keized/react-hooks-hub/use-dark-mode.yml?style=for-the-badge" alt="CI status" />
  &nbsp;
  <img src="https://img.shields.io/codecov/c/github/keized/react-hooks-hub?flag=use-dark-mode&style=for-the-badge" alt="Coverage" />
  &nbsp;
  <img src="https://img.shields.io/bundlephobia/minzip/@react-hooks-hub/use-dark-mode?style=for-the-badge" alt="Bundlephobia" />
  &nbsp;
</p>

# @react-hooks-hub/use-dark-mode

`use-dark-mode` is a custom React hook that allows you to easily manage dark mode in your application. It simplifies the handling of user preferences regarding the theme (light or dark) with support for the system default mode. This hook is configurable and can be persisted in `localStorage` to remember the user's choices between sessions.

## Features

- **Automatic Dark Mode**: Based on the user's system preferences.
- **Persistence**: Saves the user's chosen theme in `localStorage`.
- **Simple Configuration**: Customize the storage key and default mode.
- **Easy Integration**: Simple to use in any React application.

## Installation

Use your preferred package manager to install `@react-hooks-hub/use-dark-mode`:

```bash
npm install @react-hooks-hub/use-dark-mode
# or
yarn add @react-hooks-hub/use-dark-mode
```

## Usage

Import and use the useDarkMode hook in your component:

```JSX
import React from 'react';
import { useDarkMode } from '@react-hooks-hub/use-dark-mode';

function MyComponent() {
  const { switchMode, darkMode } = useDarkMode({ persistance: true, defaultMode: 'system' });

  return (
    <div style={{ background: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }}>
      <h1>{darkMode ? 'Dark Mode' : 'Light Mode'}</h1>
      <button onClick={() => switchMode('light')}>Light</button>
      <button onClick={() => switchMode('dark')}>Dark</button>
      <button onClick={() => switchMode('system')}>System</button>
    </div>
  );
};

export default MyComponent;

```

