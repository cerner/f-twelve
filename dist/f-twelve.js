var fTwelve=function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=9)}([function(e,n,t){e.exports={caretIcon:"_8CdOO",objectType:"IOIpz",size:"p-zc5",preview:"_1O2Bq",index:"_1ONir",number:"_1bTo1",boolean:"_2NlmU",string:"_3YtOR",undefined:"_1IsE2",function:"h3JqB",value:"_2K5xS",caret:"pd8O4",caretDown:"_3Pi4B",caretRight:"_1yaBT"}},function(e,n,t){e.exports={row:"_3hRwI",error:"_335cN",log:"_1aGKl",info:"l-1GV",warn:"Vbow0",output:"_3I47c",timestamp:"Kvehf",consoleArgs:"_2qhx1",fileName:"_2ZlJY"}},function(e,n,t){e.exports={domNode:"TrZNb",parent:"_1Y8UN",child:"_18-ie",key:"d2uoJ",member:"_3Tz5o",property:"_2Xs0j",copyButton:"OMHdO"}},function(e,n,t){e.exports={label:"_3xNCl",successMessage:"_18T7i",tempTextArea:"_1V-O6",copyButton:"_1V-a4",back:"_7nHVO",front:"_3uYsT"}},function(e,n,t){e.exports={fTwelve:"_2NQFL",content:"yt7l_"}},function(e,n,t){e.exports={prompt:"_29svO",promptChar:"DeIgi",promptInput:"_3PLjO"}},function(e,n,t){e.exports={tab:"_1nf15"}},function(e,n,t){e.exports={copyAllButton:"_1v2x2"}},function(e,n){"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e,n){"use strict";if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(e),r=1;r<arguments.length;r++){var o=arguments[r];if(null!=o)for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(t[i]=o[i])}return t},writable:!0,configurable:!0})},function(e,n,t){"use strict";t.r(n);t(8);function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(n){o(e,n,t[n])})}return e}function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){for(var t=arguments.length,o=new Array(t>2?t-2:0),i=2;i<t;i++)o[i-2]=arguments[i];if("fragment"===e)return o;if("function"==typeof e)return c(e,r({},n,{children:o}));var u=document.createElement(e);return n&&delete n.children,Object.assign(u,n),o.forEach(function(e){return a(u,e)}),n&&"function"==typeof n.ref&&n.ref(u),u}var c=function(e,n){var t=e(r({},n));return n&&"function"==typeof n.ref&&n.ref(t),t instanceof HTMLElement||Array.isArray(t)?t:t.el},a=function e(n,t){null===t||"boolean"==typeof t||"function"==typeof t||void 0===t||(Array.isArray(t)?t.forEach(function(t){return e(n,t)}):"string"==typeof t||"number"==typeof t?n.appendChild(document.createTextNode(t)):n.appendChild(t))},u=t(4),l=t.n(u),f=t(6),s=t.n(f),p=function(e){var n=e.label,t=e.onclick;return i("div",{className:s.a.tab,onclick:t},n)},y=function(e){var n=e.console,t=e.setContent;return i("fragment",null,i(p,{label:"Console",onclick:function(){return t(n)}}))},d=t(7),m=t.n(d),v=t(1),b=t.n(v),g=t(2),w=t.n(g),h=t(0),O=t.n(h);function N(e){return(N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var k=function(e){var n=e.meta,t=e.onClick,r=n.node,o="".concat(O.a.caret," ").concat(n.isOpen?O.a.caretDown:O.a.caretRight),c=n.key||"string"!=typeof r.value?O.a[r.dataType]:"";return r.isObject?i("fragment",null,i("div",{className:O.a.caretIcon,onclick:t},i("i",{className:o})),i("div",{className:O.a.objectType,onclick:t},r.objectType),i("div",{className:O.a.preview,onclick:t},S(n.key,r.value))):i("div",{className:"".concat(O.a.value," ").concat(c)},j(n))},j=function(e){var n=e.node.value;return null===n?"null":void 0===n?"undefined":"function"==typeof n?n.toString().replace(/\s+/g," "):e.key&&"string"==typeof n?'"'.concat(n,'"'):n.toString()},S=function(e,n){return null==n||"object"!==N(n)?"":"__proto__"===e?"{…}":Array.isArray(n)?"[".concat(n.map(function(e){return Array.isArray(e)?"[…]":"object"===N(e)?"{…}":e}).join(", "),"]"):"{".concat(Object.keys(n).join(":…, "),":…}")},_=t(3),A=t.n(_),T=function(e){var n=e.getText,t=e.title,r=void 0===t?"Copy":t;return i("div",{className:A.a.copyButton,onclick:function(e){return x(e,n)},title:r},i("div",{className:A.a.back}),i("div",{className:A.a.front}))},x=function(e,n){var t=e.currentTarget,r=n(),o=i("textarea",{className:A.a.tempTextArea,value:r});t.appendChild(o),o.select(),document.execCommand("copy"),t.removeChild(o);var c=i("span",{className:A.a.successMessage,title:"Copied"},"✔");t.appendChild(c),setTimeout(function(){return t.removeChild(c)},2e3)};function C(e){return(C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var E=function e(n){var t=n.node,r=n.isOpen,o=n.key,c={el:null,node:t,isOpen:r,key:o},a=i("div",{className:w.a.domNode},i("div",{className:w.a.parent},i("div",{className:w.a.copyButton},i(T,{getText:function(){return"object"===C(t.value)&&null!==t.value?JSON.stringify(JSON.parse(t.toJson()),null,2):t.value}})),o&&i("div",{className:w.a.key},o,":"),i(k,{meta:c,onClick:I.bind(null,c)})),r&&t.children.map(function(n){return i("div",{className:"".concat(w.a.child," ").concat(w.a[n.type])},i(e,{key:n.key,node:n.node}))}));return c.el=a,a},I=function(e){var n=i(E,{isOpen:!e.isOpen,key:e.key,node:e.node});e.el.parentNode.replaceChild(n,e.el)},J=E;function P(e){return(P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function B(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function D(e){return(D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var M=function(e){var n=e.data,t=z(n);return{dataTree:t,el:i(J,{node:t})}},z=function(e){var n={value:e,parent:arguments.length>1&&void 0!==arguments[1]?arguments[1]:null};return n.children=H(n),n.toJson=W.bind(null,n),n.isObject="object"===D(e)&&null!==e,n.size=n.isObject&&(Array.isArray(e)?Object.keys(e).length:Object.getOwnPropertyNames(e).length),n.dataType=function(e){return null===e?"null":Array.isArray(e)?"array":P(e)}(n.value),n.objectType=n.isObject&&"".concat(n.dataType.charAt(0).toUpperCase()).concat(n.dataType.slice(1),"(").concat(n.size,")"),n},H=function(e){if(null==e.value||"object"!==D(e.value))return[];var n=Object.keys(e.value),t=n.map(function(e){return{key:e,type:"member"}}),r=Object.getOwnPropertyNames(e.value).filter(function(e){return-1===n.indexOf(e)}).map(function(e){return{key:e,type:"property"}});return[].concat(B(t),B(r),[{key:"__proto__",type:"property"}]).filter(function(n){return V(e.value,n.key)}).map(function(n){var t=e.value[n.key],r=L(e,t);return{key:n.key,type:n.type,node:r||z(t,e)}})},W=function(e){var n=e.value;if(null===n)return"null";if("function"==typeof n)return JSON.stringify(n.toString());if("object"!==D(n))return JSON.stringify(n)||'"-undefined-"';var t=e.children.filter(function(e){return"member"===e.type}).map(function(n){var t=e.value[n.key],r=L(e,t)?'"-circular-"':n.node.toJson();return Array.isArray(e.value)?r:'"'.concat(n.key,'":').concat(r)}).join(",");return Array.isArray(n)?"[".concat(t,"]"):"{".concat(t,"}")},L=function e(n,t){return n?n.value===t?n:e(n.parent,t):null},V=function(e,n){try{return!!e[n]||n in e}catch(e){return!1}},U=function(){var e=new Date,n=e.toISOString().split("T")[0],t=6e4*e.getTimezoneOffset(),r=new Date(Date.now()-t).toISOString().slice(11,23);return"".concat(n," ").concat(r)};function R(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var Y,$,q,F,K,G=[],Z=function(){var e=i("div",{className:b.a.output});return{append:function(n){var t=n.verb,r=void 0===t?"log":t,o=n.args,c=n.stack,a=void 0===c?[]:c,u=U(),l=a&&a[0]||{},f=l.fileName&&l.lineNumber?"".concat(l.fileName,":").concat(l.lineNumber):l.fileName||"",s=[],p=Object.keys(o).map(function(e){var n=o[e],t=n instanceof Error||n&&n.constructor&&n.constructor.name&&n.constructor.name.indexOf("Error")>-1;return i(M,{data:t&&n.stack||n,ref:function(e){return s.push(e.dataTree)}})}),y=a.map(function(e){return e.path}).join("\n"),d=i("div",{className:"".concat(b.a.row," ").concat(b.a[r])},i("div",{className:b.a.timestamp},u.split(" ")[1]),i("div",{className:b.a.consoleArgs},R(p)),i("div",{className:b.a.fileName},i(T,{getText:function(){return y},title:"Copy stack"}),i("span",{title:y},f)));e.appendChild(d),d.scrollIntoView&&d.scrollIntoView(),G.push({timestamp:u,stack:a,treeData:s})},toJson:function(){return JSON.stringify({userAgent:navigator.userAgent,href:window.location.href,time:U(),consoleOutput:G.map(function(e){var n=e.treeData.map(function(e){return JSON.parse(e.toJson())});return{time:e.timestamp,stack:e.stack,output:n}})})},el:e}},Q=t(5),X=t.n(Q),ee=function(){var e,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=n.inputRef,r=n.exec,o=n.getHistory,c=-1,a="",u=function(n){c=-1,a=e.value},l=function(n){r(n),c=-1,a="",e.value=""},f=function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=o();c=n?Math.max(--c,-1):Math.min(++c,t.length-1),e.value=-1===c?a:t[c]||""},s=i("div",{className:X.a.prompt},i("div",{className:X.a.promptChar},"›"),i("input",{className:X.a.promptInput,onchange:u,oninput:u,onkeydown:function(n){"Enter"===n.key&&e.value?l(e.value):"ArrowUp"===n.key||"Up"===n.key?f():"ArrowDown"!==n.key&&"Down"!==n.key||f(!0)},onpaste:u,ref:function(n){return e=n}}));return"function"==typeof t&&t(e),s},ne=function e(n){if((n=n.trim()).match(/^".*"$/)||n.match(/^'.*'$/))return n.slice(1,-1);var t=n.split(/\s*=\s*/);return t.shift().replace(/(?=\[)/g,".").split(".").reduce(function(n,r,o,i){var c=r.match(/^\[([^\]]*)]$/),a=c?c[1].replace(/^["']|["']$/g,""):r;return t.length>0&&o===i.length-1&&((n||{})[a]=e(t.join("="))),(n||{})[a]},window)},te=Object.assign({},window.console),re=window.onerror&&"function"==typeof window.onerror?window.onerror.bind({}):null,oe=function(){var e,n=function(){return window.localStorage?JSON.parse(window.localStorage.getItem("fTwelve.history"))||[]:c||[]},t=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50;c.unshift(e),c.splice(n),window.localStorage&&window.localStorage.setItem("fTwelve.history",JSON.stringify(c))},r=function(){try{throw Error()}catch(e){return e.stack||""}},o=function(e){t(e),console.log(e);try{console.log(ne(e))}catch(e){console.error(e)}},c=n();return{exec:o,getHistory:n,overrideWindowConsole:function(){["log","warn","error","info"].forEach(function(n){window.console[n]=function(){for(var t=arguments.length,o=new Array(t),i=0;i<t;i++)o[i]=arguments[i];var c=1===o.length&&o[0]instanceof Error,a=r().split("\n").splice(3).join("\n"),u=function(e){try{return e.split("\n").map(function(e){return{path:(e.match(/^( *at )(.*)/)||[])[2],url:(e.match(/(http:\/\/.*?):\d+:\d+/)||[])[1],fileName:(e.match(/.+[\\\/(](.*?\.\w+)/)||[])[1],lineNumber:(e.split(":").slice(-2,-1)||[])[0],columnNumber:(e.split(":").slice(-1)[0].match(/\d+/)||[])[0]}}).filter(function(e){return e.path})}catch(e){return[]}}(c?o[0].stack:a);return e.append({verb:n,args:o,stack:u}),te[n]&&te[n].apply(window.console,o)}})},overrideWindowOnError:function(){window.onerror=function(e,n,t,r,o){return re&&"function"==typeof re&&re.call(void 0,e,n,t,r,o),console.error(o),!0}},restoreWindowConsole:function(){window.console=Object.assign({},te)},restoreWindowOnError:function(){window.onerror=re?re.bind({}):null},setHistory:t,el:i("div",{className:l.a.content},i(Z,{ref:function(n){return e=n}}),i("div",{className:m.a.copyAllButton},i(T,{getText:e.toJson,title:"Copy all output"})),i(ee,{exec:o,getHistory:n}))}},ie=function(e){var n,t,r=e.id,o=oe();return{console:o,el:i("div",{className:l.a.fTwelve,id:r},i(y,{console:o.el,setContent:function(e){t&&n.removeChild(t),e.isSameNode(t)?t=void 0:(n.appendChild(e),t=e)}}),i("div",{ref:function(e){return n=e}}))}}({id:"f-twelve"}),ce=ie.el,ae=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).show;K=!0,(void 0===e||e)&&ue(),fe(),ie.console.overrideWindowConsole(),ie.console.overrideWindowOnError()},ue=function(){!0!==F&&!0===K&&(document.getElementsByTagName("body")[0].appendChild(ce),F=!0,"function"==typeof Y&&Y())},le=function(){!0===F&&(ce.parentNode.removeChild(ce),F=!1,"function"==typeof $&&$())},fe=function(){q="",document.addEventListener("keydown",pe),document.addEventListener("keyup",ye)},se=function(){document.removeEventListener("keydown",pe),document.removeEventListener("keyup",ye)},pe=function(e){q+=e.key,"F12"!==e.key&&"F12"===q.toUpperCase()&&(F?le():ue())},ye=function(){q=""};ae({show:!1});n.default=Object.freeze({enable:ae,disable:function(){K=!1,le(),se(),ie.console.restoreWindowConsole(),ie.console.restoreWindowOnError()},hide:le,show:ue,onHide:function(e){return $=e},onShow:function(e){return Y=e}})}]).default;
//# sourceMappingURL=f-twelve.js.map