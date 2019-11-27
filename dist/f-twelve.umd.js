!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){e.exports={row:"_3FIEj",error:"_1Skk7",log:"_3nOQY",info:"_10GKt",warn:"_10mph",output:"_3IoDT",timestamp:"bMXHy",outputText:"_2z1PD",block:"_3i2PT",open:"Yae0e",fileName:"_3_Uu1",prompt:"_1h7qT",promptChar:"_1Cduj",promptInput:"TsPwl"}},function(e,t,n){e.exports={fTwelve:"_301A8",tab:"_1TihR",content:"_27uNA"}},function(e,t,n){!function(){"use strict";var t,n,o=function(e,t){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n)},r=function(e,t){for(var n in e)t(n)},i=function(e,t,n){null!=e&&(n=n||{},Object.getOwnPropertyNames(e).forEach(function(e){n[e]||(t(e),n[e]=!0)}),i(Object.getPrototypeOf(e),t,n))};Object.defineProperty(Date.prototype,"toPrunedJSON",{value:Date.prototype.toJSON});var a=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,s={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function c(e){return a.lastIndex=0,a.test(e)?'"'+e.replace(a,function(e){var t=s[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}var u=function(e,a,s){var u,l='"-pruned-"';if("object"==typeof a){var h=a;a=h.depthDecr,s=h.arrayMaxLength,n=h.iterator||o,h.allProperties?n=i:h.inheritedProperties&&(n=r),"prunedString"in h&&(l=h.prunedString),h.replacer&&(u=h.replacer)}else n=o;return t=[],s=s||50,function e(o,r,i){var a,h,p,f,d=r[o];switch(d&&"object"==typeof d&&"function"==typeof d.toPrunedJSON&&(d=d.toPrunedJSON(o)),d&&"function"==typeof d.toJSON&&(d=d.toJSON()),typeof d){case"string":return c(d);case"number":return isFinite(d)?String(d):"null";case"boolean":case"null":return String(d);case"object":if(!d)return"null";if(i<=0||-1!==t.indexOf(d)){if(u){var y=u(d,l,!0);return void 0===y?void 0:""+y}return l}if(t.push(d),f=[],"[object Array]"===Object.prototype.toString.apply(d)){for(p=Math.min(d.length,s),a=0;a<p;a+=1)f[a]=e(a,d,i-1)||"null";return h="["+f.join(",")+"]",u&&d.length>s?u(d,h,!1):h}return n(d,function(t){try{(h=e(t,d,i-1))&&f.push(c(t)+":"+h)}catch(e){}}),"{"+f.join(",")+"}";case"function":case"undefined":return u?u(d,void 0,!1):void 0}}("",{"":e},a=a||6)};u.log=function(){console.log.apply(console,Array.prototype.map.call(arguments,function(e){return JSON.parse(JSON.prune(e))}))},u.forEachProperty=i,e.exports=u}()},function(e,t,n){"use strict";n.r(t);var o=n(1),r=n.n(o);function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var a=function(){function e(t){var n=t.onClick,o=t.label,r=t.content;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=document.createElement("div"),this.onClick=n,this.label=o,this.content=r}var t,n,o;return t=e,(n=[{key:"render",value:function(){return this.el.className=r.a.tab,this.el.innerText=this.label,this.el.onclick=this.onClick.bind(this,this.content.render()),this.el}}])&&i(t.prototype,n),o&&i(t,o),e}();function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var c=function(){function e(t){var n=t.setContent,o=t.console;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=document.createElement("div"),this.setContent=n,this.console=o}var t,n,o;return t=e,(n=[{key:"render",value:function(){var e=this;return this.getTabs().forEach(function(t){e.el.appendChild(t.render())}),this.el}},{key:"getTabs",value:function(){var e=this.setContent.bind(this);return[new a({onClick:e,label:"Console",content:this.console})]}}])&&s(t.prototype,n),o&&s(t,o),e}(),u=n(0),l=n.n(u);function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var f=n(2),d=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=document.createElement("div")}var t,n,o;return t=e,o=[{key:"onClickExpandIcon",value:function(e){e.classList.contains(l.a.open)?e.classList.remove(l.a.open):e.classList.add(l.a.open)}}],(n=[{key:"render",value:function(){return this.el.className=l.a.output,this.el}},{key:"append",value:function(t){var n=this,o=t.verb,r=void 0===o?"log":o,i=t.args,a=t.stack,s=void 0===a?[]:a,c=document.createElement("div");c.className="".concat(l.a.row," ").concat(l.a[r]);var u=document.createElement("span"),p=6e4*(new Date).getTimezoneOffset();u.className=l.a.timestamp,u.textContent=new Date(Date.now()-p).toISOString().slice(11,23),c.appendChild(u);var d=s&&s[0]||{},y=document.createElement("a");y.className=l.a.fileName,y.textContent=d.fileName&&d.lineNumber?"".concat(d.fileName,":").concat(d.lineNumber):d.fileName||"",y.title=s.map(function(e){return e.path}).join("\n"),y.href=d.url,c.appendChild(y),Object.keys(i).forEach(function(t){var o=i[t],r=document.createElement("span");r.className=l.a.outputText,"object"===h(o)?r.innerHTML=o.constructor&&o.constructor.name&&o.constructor.name.indexOf("Error")>-1?o.stack:JSON.stringify(JSON.parse(f(o,e.pruneOptions)),null,2):r.innerHTML=o,r.textContent.indexOf("\n")>-1&&(r.classList.add(l.a.block),r.onclick=e.onClickExpandIcon.bind(n,r)),c.appendChild(r)}),this.el.appendChild(c),c.scrollIntoView&&c.scrollIntoView()}}])&&p(t.prototype,n),o&&p(t,o),e}();d.pruneOptions={depthDecr:10,replacer:function(e,t,n){return n?'"-circular-"':void 0===e?'"-undefined-"':Array.isArray(e)?'"-array('+e.length+')-"':t}};var y=d;function v(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var m=function(){function e(t){var n=t.console;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=document.createElement("div"),this.console=n,this.historyPos=-1,this.currentInput=""}var t,n,o;return t=e,(n=[{key:"render",value:function(){var e=document.createElement("div");return e.className=l.a.promptChar,e.innerHTML="&#8250;",this.el.appendChild(e),this.promptInput=document.createElement("input"),this.promptInput.className=l.a.promptInput,this.promptInput.onkeydown=this.onKeyDown.bind(this),this.promptInput.onchange=this.onChange.bind(this),this.promptInput.onpaste=this.onChange.bind(this),this.promptInput.oninput=this.onChange.bind(this),this.el.appendChild(this.promptInput),this.el.className=l.a.prompt,this.el}},{key:"onKeyDown",value:function(e){"Enter"===e.key&&this.promptInput.value?this.executeCommand(this.promptInput.value):"ArrowUp"===e.key||"Up"===e.key?this.retrieveHistory():"ArrowDown"!==e.key&&"Down"!==e.key||this.retrieveHistory(!0)}},{key:"onChange",value:function(){this.historyPos=-1,this.currentInput=this.promptInput.value}},{key:"executeCommand",value:function(e){this.console.exec(e),this.historyPos=-1,this.currentInput="",this.promptInput.value=""}},{key:"retrieveHistory",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this.console.getHistory();this.historyPos=e?Math.max(--this.historyPos,-1):Math.min(++this.historyPos,t.length-1),this.promptInput.value=-1===this.historyPos?this.currentInput:t[this.historyPos]||""}}])&&v(t.prototype,n),o&&v(t,o),e}();function b(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var w=Object.assign({},window.console),g=window.onerror&&"function"==typeof window.onerror?window.onerror.bind({}):null,k=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=document.createElement("div"),this.execHistory=this.getHistory(),this.output=new y,this.prompt=new m({console:this})}var t,n,o;return t=e,(n=[{key:"render",value:function(){return this.el.className=r.a.content,this.el.appendChild(this.output.render()),this.el.appendChild(this.prompt.render()),this.el}},{key:"getHistory",value:function(){return window.localStorage?JSON.parse(window.localStorage.getItem("fTwelve.history"))||[]:this.execHistory||[]}},{key:"setHistory",value:function(e){this.execHistory.unshift(e),this.execHistory=this.execHistory.slice(0,50),window.localStorage&&window.localStorage.setItem("fTwelve.history",JSON.stringify(this.execHistory))}},{key:"parseStack",value:function(e){return e.split("\n").map(function(e){return{path:(e.match(/^( *at )(.*)/)||[])[2],url:(e.match(/(http:\/\/.*?):\d+:\d+/)||[])[1],fileName:(e.match(/.+[\\\/(](.*?\.\w+)/)||[])[1],lineNumber:(e.split(":").slice(-2,-1)||[])[0],columnNumber:(e.split(":").slice(-1)[0].match(/\d+/)||[])[0]}}).filter(function(e){return e.path})}},{key:"overrideWindowConsole",value:function(){var e=this;["log","warn","error","info"].forEach(function(t){window.console[t]=function(){for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];var i=1===o.length&&o[0]instanceof Error,a=(Error().stack||"").split("\n").splice(2).join("\n"),s=e.parseStack(i?o[0].stack:a);return e.output.append({verb:t,args:o,stack:s}),alert(w.toString()+t),w[t].apply(window.console,o)}})}},{key:"restoreWindowConsole",value:function(){window.console=Object.assign({},w)}},{key:"overrideWindowOnError",value:function(){var e=this;window.onerror=function(t,n,o,r,i){return g&&"function"==typeof g&&g.call(e,t,n,o,r,i),console.error(i),!0}}},{key:"restoreWindowOnError",value:function(){window.onerror=g?g.bind({}):null}},{key:"exec",value:function(e){this.setHistory(e),console.log(e);try{console.log(this.parseCommand(e))}catch(e){console.error(e)}}},{key:"parseCommand",value:function(e){var t=this;if((e=e.trim()).startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'"))return e.slice(1,-1);var n=e.split(/\s*=\s*/);return n.shift().replace(/(?=\[)/g,".").split(".").reduce(function(e,o,r,i){var a=o.match(/^\[([^\]]*)]$/),s=a?a[1].replace(/^["']|["']$/g,""):o;return n.length>0&&r===i.length-1&&((e||{})[s]=t.parseCommand(n.join("="))),(e||{})[s]},window)}}])&&b(t.prototype,n),o&&b(t,o),e}();function C(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var O=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=document.createElement("div"),this.console=new k,this.onAttach=void 0,this.onDetach=void 0,this.onKeyDown=this.onKeyDown.bind(this),this.onKeyUp=this.onKeyUp.bind(this),this.enable(!1),this.render()}var t,n,o;return t=e,(n=[{key:"render",value:function(){return this.el.id="f-twelve",this.el.className=r.a.fTwelve,this.contentWrapper=document.createElement("div"),this.el.appendChild(new c({console:this.console,setContent:this.setContent.bind(this)}).render()),this.el.appendChild(this.contentWrapper),this.el}},{key:"setContent",value:function(e){this.content&&this.contentWrapper.removeChild(this.content),e.isSameNode(this.content)?this.content=void 0:(this.contentWrapper.appendChild(e),this.content=e)}},{key:"enable",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.active=!0,e&&this.attach(),this.enableKeyboardTrigger(),this.console.overrideWindowConsole(),this.console.overrideWindowOnError()}},{key:"disable",value:function(){this.active=!1,this.detach(),this.disableKeyboardTrigger(),this.console.restoreWindowConsole(),this.console.restoreWindowOnError()}},{key:"attach",value:function(){!0!==this.attached&&!0===this.active&&(document.getElementsByTagName("body")[0].appendChild(this.el),this.attached=!0,"function"==typeof this.onAttach&&this.onAttach())}},{key:"detach",value:function(){if(!0===this.attached){var e=document.getElementById(this.el.id);e.parentNode.removeChild(e),this.attached=!1,"function"==typeof this.onDetach&&this.onDetach()}}},{key:"onKeyDown",value:function(e){this.keyDownStack+=e.key,"F12"!==e.key&&"F12"===this.keyDownStack.toUpperCase()&&(this.attached?this.detach():this.attach())}},{key:"onKeyUp",value:function(){this.keyDownStack=""}},{key:"enableKeyboardTrigger",value:function(){this.keyDownStack="",document.addEventListener("keydown",this.onKeyDown),document.addEventListener("keyup",this.onKeyUp)}},{key:"disableKeyboardTrigger",value:function(){document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("keyup",this.onKeyUp)}}])&&C(t.prototype,n),o&&C(t,o),e}());window.FTwelve=Object.freeze({enable:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return O.enable(e)},disable:function(){return O.disable()},hide:function(){return O.detach(O)},show:function(){return O.attach(O)},onHide:function(e){return O.onDetach=e},onShow:function(e){return O.onAttach=e}})}]);
//# sourceMappingURL=f-twelve.umd.js.map