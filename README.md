# F-Twelve
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

Render console output to the DOM and provide an input console for troubleshooting environments that do not have the usual F12 dev console. The tool is designed to be included in Production code. Features include: 

 - Written in vanilla JavaScript and minified to add as little overhead as possible.
 - Automatically starts hidden and is attached to the DOM via JS or keyboard shortcut.
 - Provides callbacks for when attaching to the DOM. This could be used, for example, to use F-Twelve's "debug hotkey" to enable additional "debug mode" features in the consuming application. 

## Usage

Include `dist/f-twelve.umd.js`. and `dist/f-twelve.css` in your web application and it will enable F-Twelve. To view the tool, call `FTwelve.show()` or press and hold `F`+`1`+`2` in that order. A demo page with examples of the API can be found in `demo/index.html`. See it live at [https://engineering.cerner.com/f-twelve/demo/](https://engineering.cerner.com/f-twelve/demo/).

The **Global Require** steps will work anywhere but ES6 import steps are also below. Add the following to package.json to add the project to NPM dependencies, note the release version can be specified: 

```js
"f-twelve": "git+https://github.com/cerner/f-twelve#v1.0.0"
```

### Global Require
**JS**: Include `f-twelve.umd.js` in any HTML file to enable the tool and make the `FTwelve` object globally available:
```html
<script src="./node_modules/f-twelve/dist/f-twelve.umd.js"></script>
```

**CSS**: 
```html
<link rel="stylesheet" href="./node_modules/f-twelve/dist/f-twelve.css"/>
```


### ES6 import
**JS**: Import the module and the `FTwelve` object with the API will be globally available: 
```js 
import "f-twelve";
```

**CSS**: Use the `link` tag above to include CSS, or if you are using a style loader with your bundler: 
```js
import "f-twelve/dist/f-twelve.css";
```

### Initialization
Once the JS script is included, no further configuration is required. It will be hidden and waiting for the `F`+`1`+`2` keyboard shortcut. There is also a global `FTwelve` object object with an API.  

See [Demo Page](https://engineering.cerner.com/f-twelve/demo/) for demo and full API. 
