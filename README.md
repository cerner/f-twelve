<p align="center">
  <img src="icon/F-Twelve%20100.png">
</p>

<h1 align="center">
  F-Twelve
</h1>

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![js-standard-style](https://img.shields.io/badge/Code%20Style-Standard-brightgreen.svg)](http://standardjs.com)
[![Framework](https://img.shields.io/badge/Framework-Vanilla%20JS-yellow.svg)](http://vanilla-js.com/)

Render console output to the DOM and provide an input console for troubleshooting environments that do not have the usual F12 dev console. The tool is designed to be included in Production code. Features include: 

 - Written in vanilla JavaScript and minified to add as little overhead as possible.
 - Automatically starts hidden and is attached to the DOM via JS or keyboard shortcut.
 - Provides callbacks for when attaching to the DOM. This could be used, for example, to use F-Twelve's "debug hotkey" to enable additional "debug mode" features in the consuming application. 
 - Can be used as an ES6 import or global via HTML Tag.   

## Usage

```shell
npm install f-twelve --save-dev
```

Include `dist/f-twelve.js`. and `dist/f-twelve.css` in your web application. To view the tool, press and hold `F`+`1`+`2` in that order (similar to the Windows salute `ctrl`+`alt`+`delete`) or call `fTwelve.show()` . A demo page with examples of the API can be found in `demo/index.html`. See it live at [https://engineering.cerner.com/f-twelve/demo/](https://engineering.cerner.com/f-twelve/demo/).

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
<script src="./node_modules/f-twelve/dist/f-twelve.js"></script>
```

**CSS**: 
```html
<link rel="stylesheet" href="./node_modules/f-twelve/dist/f-twelve.css"/>
```

### Initialization
Once the JS script is included, no further configuration is required. It will be hidden and waiting for the `F`+`1`+`2` keyboard shortcut. There is also a global `fTwelve` object available with an API.  

See [Demo Page](https://engineering.cerner.com/f-twelve/demo/) for demo and full API. 

## Development

This project utilizes JSX _without_ [React](https://reactjs.org/), this makes it easy to construct DOM elements but without the overhead of React. JSX syntax in vanilla JS is accomplished by using [@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) with the [pragma](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#pragma) option. This causes input like this [/src/components/App.js](/src/components/App.js#L29-#L30) to be transformed into output like this [/lib/components/App.js](/lib/components/App.js#L42-#L52). 

The custom function that handles the data from the JSX is [/src/utilities/jsx.js](/src/utilities/jsx.js). It supports: 
- regular DOM elements (e.g. `div`, `p`, `span`, etc.)
- Custom components (e.g. `App`, `Tab`, etc.)
- Fragments (list versions of the above)
It has special logic for the custom components. The definition of the component may directly return a JSX expression (just like React) or it can return an object with a JSX expression assigned to the `el` member. This allows the functional components to be used in JSX like usual or it can be called like a regular function and provide an API along with the DOM element. This is useful for unit tests as well as components interacting since there are no React lifecycle functions or hooks available. 
