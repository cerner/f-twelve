<p align="center">
  <img src="icon/F-Twelve%20100.png">
</p>

<h1 align="center">
  F-Twelve
</h1>

[![License](https://img.shields.io/badge/License-Apache%202.0-yellow.svg)](https://opensource.org/licenses/Apache-2.0)
[![js-standard-style](https://img.shields.io/badge/Code%20Style-Standard-brightgreen.svg)](http://standardjs.com)
[![Framework](https://img.shields.io/badge/Framework-React-blue.svg)](https://reactjs.org/)

In-DOM dev tools for troubleshooting environments that do not have the usual F12 dev console. Currently supports a Console and Network tab. The tool is designed to be included in Production code. Features include: 

 - Automatically starts hidden and is attached to the DOM via JS or keyboard shortcut.
 - Provides callbacks for when attaching to the DOM. This could be used, for example, to use F-Twelve's "debug hotkey" to enable additional "debug mode" features in the consuming application. 
 - Can be used as an ES import or global via HTML Tag.   

## Usage

```shell
npm install f-twelve --save-dev
```

Include `dist/f-twelve.js`. and `dist/f-twelve.css` in your web application. To view the tool, press and hold `F`+`1`+`2` in that order (similar to the Windows salute `ctrl`+`alt`+`delete`) or call `fTwelve.show()` . A demo page with examples of the API can be found in `demo/index.html`. See it live at [https://engineering.cerner.com/f-twelve/demo/](https://engineering.cerner.com/f-twelve/demo/).

The tool can be enabled via [ES6 Import](#es6-import) or [HTML Tag](#html-tag):

### ES6 Import

See [webpack.config.js](/webpack.config.js) for example of required CSS loaders. 

```js 
import "f-twelve";
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
