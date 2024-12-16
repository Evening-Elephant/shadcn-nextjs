# Shadcn UI for Next.js - VSCode Extension

This extension enables you to easily install and import Shadcn UI components directly into your Next.js project from within Visual Studio Code. It offers quick fixes and automatic imports for popular UI components like `Button`, `Input`, `Card`, `Dialog`, and many more.

## Features

- **Quick Install**: Easily install Shadcn UI components using `npx` from within VSCode.
- **Automatic Imports**: After installing a component, the extension will automatically insert the corresponding import statement at the top of your file.
- **Supported Components**: A variety of Shadcn UI components are supported, including `Button`, `Input`, `Card`, `Dialog`, `Popover`, `Tooltip`, and more.
- **Hover Info**: Get instant hover info and installation options for Shadcn components directly in your code.

[Screenshot]([https://raw.githubusercontent.com/username/repository/branch/images/shadcn-nextjs.gif](https://github.com/Evening-Elephant/shadcn-nextjs/blob/main/images/shadcn-nextjs.gif))

## Supported Components

Here are some of the supported Shadcn UI components:

- `Button`
- `Input`
- `Label`
- `Card`
- `Dialog`
- `Checkbox`
- `Alert`
- `Select`
- `Popover`
- `Tooltip`
- `DropdownMenu`
- `HoverCard`
- `NavigationMenu`
- `ToggleGroup`
- `RadioGroup`
- `ScrollArea`
- `ResizableHandle`
- `Toaster`
- And more!

## Installation

To use this extension, follow these steps:

1. **Install the Extension**:
   - Open VSCode.
   - Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
   - Search for `Shadcn UI for Next.js`.
   - Click **Install**.

2. **Install Shadcn UI Components**:
   - Open a `.tsx` or `.js` file in your Next.js project.
   - Type the name of any supported Shadcn UI component (e.g., `Button`, `Card`, etc.).
   - A quick fix will appear that allows you to install and import the component.

3. **Enjoy the Automatic Imports**:
   - Once you select a component to install, the extension will run `npx shadcn-ui` in your terminal and automatically insert the import statement at the top of your file.

## Usage

### Quick Fixes

When you type a component name like `Button`, `Card`, or `Dialog` in your code, you'll see a lightbulb icon appear next to it. You can then:

1. Click on the lightbulb to see the quick fix options.
2. Select the option to install the Shadcn component and automatically import it.

The extension will run the necessary `npx shadcn-ui` command and insert the import statement like this:

```tsx
import { Button } from "@/components/ui/button";
