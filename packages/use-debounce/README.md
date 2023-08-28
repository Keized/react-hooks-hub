
<h1 align="center">Use Debounce</h1>

<p align="center">
  `@react-hooks-hub/use-debounce` hook allows you to manage delayed execution of functions, making it particularly useful for scenarios where you need to control the rate of certain actions based on user input.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@react-hooks-hub/use-debounce" title="use-debounce on NPM">
  <img src="https://img.shields.io/npm/v/@react-hooks-hub/use-debounce.svg?style=for-the-badge" alt="NPM version" />
  </a>
  <img src="https://img.shields.io/github/actions/workflow/status/Keized/react-hooks-hub/use-debounce.yml?style=for-the-badge" alt="CI status" />
  &nbsp;
  <img src="https://img.shields.io/codecov/c/github/keized/react-hooks-hub?flag=use-debounce&style=for-the-badge" alt="Coverage" />
  &nbsp;
  <img src="https://img.shields.io/bundlephobia/minzip/@react-hooks-hub/use-debounce?style=for-the-badge" alt="Bundlephobia" />
  &nbsp;
</p>



# @react-hooks-hub/use-debounce


## Installation

Use your preferred package manager to install `@react-hooks-hub/use-debounce`:

```bash
npm install @react-hooks-hub/use-debounce
# or
yarn add @react-hooks-hub/use-debounce
```

## Usage

Import and use the useDebounce hook in your component:

```JSX
import React from 'react';
import { useDebounce } from '@react-hooks-hub/use-debounce';

const MyComponent = () => {
  // Create a debounced version of the handleSearch function using the useDebounce hook
  // The debounced function will trigger after a 300ms delay after the last change
  const debouncedSearch = useDebounce(handleSearch, 300);

  // Define the handleSearch function, which represents the action to be debounced
  // This function takes a 'query' parameter representing the search query
  // In this example, the function logs the query to the console
  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <input
      type="text"
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default MyComponent;
```

