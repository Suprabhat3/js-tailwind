We want to make a script that used for add style in html file we add class in html code, we check the class and add the in line style accordingly.


## PRD 
What to Build?
In this project, you will build your own lightweight utility-first CSS engine using JavaScript.

Instead of writing traditional CSS, users will write class names following a pattern like chai-* (for example: chai-p-2, chai-bg-red, chai-text-center). Your script will scan the DOM, read these class names, convert them into corresponding inline styles, and apply them dynamically.

For example:

chai-p-2 → padding: 2px

chai-bg-red → background-color: red

Your system should:

Traverse the DOM after page load

Identify all classes starting with chai-

Parse the class names and extract styling values

Apply inline styles using JavaScript

Remove or ignore the original chai-* classes

You are expected to support multiple commonly used utilities such as:

Spacing (padding, margin)

Colors (background, text)

Typography (font size, alignment)

Borders and radius

Basic layout utilities

This project focuses on DOM manipulation, pattern parsing, and building a reusable client-side library that mimics the behavior of utility-first CSS frameworks.