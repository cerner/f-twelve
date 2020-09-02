"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../../../utilities/jsx"));

var _ConsoleModule = _interopRequireDefault(require("./Console.module.scss"));

var _jsonPrune = _interopRequireDefault(require("json-prune"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Console tab output
 */
var _default = function _default() {
  var el = (0, _jsx["default"])("div", {
    className: _ConsoleModule["default"].output
  });

  var append = function append(_ref) {
    var _ref$verb = _ref.verb,
        verb = _ref$verb === void 0 ? 'log' : _ref$verb,
        args = _ref.args,
        _ref$stack = _ref.stack,
        stack = _ref$stack === void 0 ? [] : _ref$stack;
    var newEntry = document.createElement('div');
    newEntry.className = "".concat(_ConsoleModule["default"].row, " ").concat(_ConsoleModule["default"][verb]); // Add timestamp

    var timestamp = document.createElement('span');
    var tzOffset = new Date().getTimezoneOffset() * 60000;
    timestamp.className = _ConsoleModule["default"].timestamp;
    timestamp.textContent = new Date(Date.now() - tzOffset).toISOString().slice(11, 23);
    newEntry.appendChild(timestamp); // Add file name

    var frame = stack && stack[0] || {};
    var fileName = document.createElement('a');
    fileName.className = _ConsoleModule["default"].fileName;
    fileName.textContent = frame.fileName && frame.lineNumber ? "".concat(frame.fileName, ":").concat(frame.lineNumber) : frame.fileName || '';
    fileName.title = stack.map(function (frame) {
      return frame.path;
    }).join('\n');
    fileName.href = frame.url;
    newEntry.appendChild(fileName);
    Object.keys(args).forEach(function (key) {
      var arg = args[key]; // Output text

      var outputText = document.createElement('span');
      outputText.className = _ConsoleModule["default"].outputText;

      if (_typeof(arg) === 'object') {
        outputText.innerHTML = arg && arg.constructor && arg.constructor.name && arg.constructor.name.indexOf('Error') > -1 ? arg.stack : JSON.stringify(JSON.parse((0, _jsonPrune["default"])(arg, pruneOptions)), null, 2);
      } else {
        outputText.innerHTML = arg;
      } // Expand icon


      if (outputText.textContent.indexOf('\n') > -1) {
        outputText.classList.add(_ConsoleModule["default"].block);

        outputText.onclick = function () {
          return onClickExpandIcon(outputText);
        };
      }

      newEntry.appendChild(outputText);
    });
    el.appendChild(newEntry);

    if (newEntry.scrollIntoView) {
      newEntry.scrollIntoView();
    }
  };

  return {
    append: append,
    pruneOptions: pruneOptions,
    el: el
  };
};

exports["default"] = _default;

var onClickExpandIcon = function onClickExpandIcon(outputEntry) {
  if (outputEntry.classList.contains(_ConsoleModule["default"].open)) {
    outputEntry.classList.remove(_ConsoleModule["default"].open);
  } else {
    outputEntry.classList.add(_ConsoleModule["default"].open);
  }
};

var pruneOptions = {
  depthDecr: 10,
  replacer: function replacer(value, defaultValue, circular) {
    if (circular) return "\"-circular-\"";
    if (value === undefined) return "\"-undefined-\"";
    if (Array.isArray(value)) return "\"-array(" + value.length + ")-\"";
    /* istanbul ignore next */

    return defaultValue;
  }
};