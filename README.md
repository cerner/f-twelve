<p align="center">
  <img src="icon/F-Twelve%20100.png">
</p>

<h1 align="center">
  F-Twelve
</h1>

[![Build Status](https://travis-ci.com/cerner/f-twelve.svg?branch=master)](https://travis-ci.com/cerner/f-twelve)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

Render console output to the DOM and provide an input console for troubleshooting environments that do not have the usual F12 dev console. The tool is designed to be included in Production code. Features include: 

 - Written in vanilla JavaScript and minified to add as little overhead as possible.
 - Automatically starts hidden and is attached to the DOM via JS or keyboard shortcut.
 - Provides callbacks for when attaching to the DOM. This could be used, for example, to use F-Twelve's "debug hotkey" to enable additional "debug mode" features in the consuming application. 

## Usage

```js
npm install f-twelve --save-dev
```

Include `dist/f-twelve.umd.js`. and `dist/f-twelve.css` in your web application. To view the tool, press and hold `F`+`1`+`2` in that order or call `FTwelve.show()` . A demo page with examples of the API can be found in `demo/index.html`. See it live at [https://engineering.cerner.com/f-twelve/demo/](https://engineering.cerner.com/f-twelve/demo/).

The tool can be enabled via [ES6 Import](#es6-import) or [HTML Tag](#html-tag):

### ES6 Import

**JS** 
```js 
import "f-twelve";
```

**CSS**
```js
import "f-twelve/dist/f-twelve.css";
```

### HTML Tag

**JS**
```html
<script src="./node_modules/f-twelve/dist/f-twelve.umd.js"></script>
```

**CSS**: 
```html
<link rel="stylesheet" href="./node_modules/f-twelve/dist/f-twelve.css"/>
```

### Initialization
Once the JS script is included, no further configuration is required. It will be hidden and waiting for the `F`+`1`+`2` keyboard shortcut. There is also a global `FTwelve` object available with an API.  

See [Demo Page](https://engineering.cerner.com/f-twelve/demo/) for demo and full API. 
