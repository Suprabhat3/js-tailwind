# Chai Utility Playground

Chai Utility Playground is a beginner-friendly project that teaches how a utility-first CSS engine can be built with plain JavaScript.

Instead of writing CSS files, users write class names that start with chai-. The engine reads those class names, converts them to CSS properties, and applies them as inline styles.

Examples:
- chai-p-20 -> padding: 20px
- chai-bg-red -> background-color: red
- chai-text-center -> text-align: center

## Learning Objectives

This project helps students practice:
- DOM traversal and element selection
- String parsing and class-name patterns
- Mapping tokens to CSS properties
- Dynamic style application with JavaScript
- Basic error handling for unsupported input

## Project Structure

- index.html
	- Playground UI
	- Uses chai-* classes directly in markup
	- Loads JavaScript files
- style.js
	- Core utility engine
	- Parses chai-* classes
	- Applies inline styles
- playground.js
	- Handles user interactions
	- Run and Reset buttons
	- Unsupported class alerts

## How the Engine Works

1. On DOMContentLoaded, the engine scans all elements with class attributes.
2. It filters classes that begin with chai-.
3. It parses each class into utility key and utility value.
4. It builds a style object from known utility rules.
5. It applies styles using element.style.setProperty.
6. Unsupported classes are collected and reported in the playground.

## Class Grammar

General format:
- chai-<utility>-<value>

Examples:
- chai-p-10
- chai-text-18
- chai-bg-lightblue

## Supported Utilities

### Spacing

- chai-p-N, chai-pt-N, chai-pr-N, chai-pb-N, chai-pl-N
- chai-px-N, chai-py-N
- chai-m-N, chai-mt-N, chai-mr-N, chai-mb-N, chai-ml-N
- chai-mx-N, chai-my-N

N must be numeric, and is converted to px.

### Color and Text

- chai-bg-colorName -> background-color
- chai-text-colorName -> color
- chai-text-N -> font-size (px)
- chai-text-left|right|center|justify -> text-align

### Border and Radius

- chai-border-N -> border-width: Npx and border-style: solid
- chai-border-colorName -> border-color
- chai-rounded-N -> border-radius: Npx

### Size and Layout

- chai-w-N -> width: Npx
- chai-h-N -> height: Npx
- chai-maxw-N -> max-width: Npx
- chai-gap-N -> gap: Npx
- chai-flex -> display: flex
- chai-grid -> display: grid
- chai-block -> display: block
- chai-inline-block -> display: inline-block
- chai-wrap -> flex-wrap: wrap
- chai-nowrap -> flex-wrap: nowrap
- chai-font-bold -> font-weight: 700
- chai-decoration-none -> text-decoration: none

### Flex Utilities

Use these classes to build row/column layouts and alignment.

- chai-flex -> display: flex
- chai-flex-row -> flex-direction: row
- chai-flex-col -> flex-direction: column
- chai-wrap -> flex-wrap: wrap
- chai-nowrap -> flex-wrap: nowrap
- chai-gap-N -> gap: Npx

Justify content options:

- chai-justify-start
- chai-justify-end
- chai-justify-center
- chai-justify-between
- chai-justify-around
- chai-justify-evenly

Align items options:

- chai-items-start
- chai-items-end
- chai-items-center
- chai-items-stretch

Example:

- chai-flex chai-flex-row chai-justify-between chai-items-center chai-gap-12

### Grid Utilities

Use these classes to build multi-column layouts quickly.

- chai-grid -> display: grid
- chai-cols-N -> grid-template-columns: repeat(N, minmax(0, 1fr))
- chai-rows-N -> grid-template-rows: repeat(N, minmax(0, 1fr))
- chai-gap-N -> gap: Npx

Examples:

- chai-grid chai-cols-3 chai-gap-12
- chai-grid chai-cols-2 chai-rows-2 chai-gap-8

## Playground Flow

1. Click preset chips to add classes into the input.
2. Or type your own chai-* classes manually.
3. Click Run Conversion.
4. The preview box resets to base classes, then applies user classes.
5. If any class is unsupported, a popup alert and message are shown.
6. Click Reset to clear the input and restore preview defaults.

## Public API

The core engine exposes these functions globally:

- window.applyChaiUtilities(options)
- window.applyUtilitiesToElement(element, classNames, options)
- window.parseUtilityClass(className)

These are useful for demos, testing, and teaching.

## Known Limitations

- Limited set of utility keys
- Color values are used as plain strings (for example red, teal, lightblue)
- No advanced units like rem, em, %, vw, vh
- No pseudo classes, states, or breakpoint variants

## How to Run

1. Open index.html in a browser.
2. Use the playground controls.
3. Inspect elements in DevTools to see generated inline styles.
4. Modify style.js to add new utilities or change behavior.