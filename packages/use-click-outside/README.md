
<h1 align="center">Use Click Outside</h1>

<p align="center">
`@react-hooks-hub/use-click-outside` is a custom React hook designed for detecting clicks outside a specified element or set of elements. Easy to integrate and use, this hook is perfect for scenarios like closing dropdown menus, popups, or modals when a user clicks outside these components. It supports multiple referenced elements and provides a straightforward interface for adding custom click outside event handling. Compatible with React and TypeScript, useClickOutside is an essential tool for enhancing user interaction in your web applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@react-hooks-hub/use-click-outside" title="use-click-outside on NPM">
  <img src="https://img.shields.io/npm/v/@react-hooks-hub/use-click-outside.svg?style=for-the-badge" alt="NPM version" />
  </a>
  <img src="https://img.shields.io/github/actions/workflow/status/Keized/react-hooks-hub/use-click-outside.yml?style=for-the-badge" alt="CI status" />
  &nbsp;
  <img src="https://img.shields.io/bundlephobia/minzip/@react-hooks-hub/use-click-outside?style=for-the-badge" alt="Bundlephobia" />
  &nbsp;
</p>



# @react-hooks-hub/use-click-outside


## Installation

Use your preferred package manager to install `@react-hooks-hub/use-click-outside`:

```bash
npm install @react-hooks-hub/use-click-outside
# or
yarn add @react-hooks-hub/use-click-outside
```

## Usage

Import and use the useClickOutside hook in your component:

```JSX
import React, { useState, useRef } from 'react';
import { useClickOutside } from '@react-hooks-hub/use-click-outside';

function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useClickOutside([menuRef], (isOutside) => {
      setIsOpen(isOutside)
    });

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button>
            {isOpen && (
                <div ref={menuRef}>
                    {/* content */}
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
```

