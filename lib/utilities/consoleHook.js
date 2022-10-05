"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.restoreWindowOnError = exports.overrideWindowOnError = exports.restoreWindowConsole = exports.overrideWindowConsole = exports.onError = exports.console = void 0;

var _parseStack = _interopRequireDefault(require("./parseStack"));

var _this = void 0;

/**
 * Expose callbacks for when window console functions are used
 * This is not a React hook
 */
// Store original window.console and window.onerror
var console = Object.assign({}, window.console);
exports.console = console;
var onError = window.onerror && typeof window.onerror === 'function' ? window.onerror.bind({}) : null;
/**
 * Is executed when a `console[level]` is executed (when hook is enabled)
 */

exports.onError = onError;
var consoleCallback;
/**
 * Override the 4 "level" functions (log, warn, error, info)
 */

var overrideWindowConsole = function overrideWindowConsole() {
  var levels = ['log', 'warn', 'error', 'info'];
  levels.forEach(function (level) {
    window.console[level] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var isError = args.length === 1 && args[0] instanceof Error;
      var stackPreFtwelve = getStack().split('\n').splice(3).join('\n');
      var stack = (0, _parseStack["default"])(isError ? args[0].stack : stackPreFtwelve);

      if (typeof consoleCallback === 'function') {
        consoleCallback({
          level: level,
          args: args,
          stack: stack
        });
      }

      return console[level] && console[level].apply(window.console, args);
    };
  });
};
/**
 * Only way to get a stack in IE is throw an actual error!
 */


exports.overrideWindowConsole = overrideWindowConsole;

var getStack = function getStack() {
  try {
    throw Error();
  } catch (error) {
    return error.stack || '';
  }
};

var restoreWindowConsole = function restoreWindowConsole() {
  window.console = Object.assign({}, console);
};

exports.restoreWindowConsole = restoreWindowConsole;

var overrideWindowOnError = function overrideWindowOnError() {
  window.onerror = function (message, source, lineNo, colNo, error) {
    if (typeof onError === 'function') {
      onError.call(_this, message, source, lineNo, colNo, error);
    }

    window.console.error(error);
    return true;
  };
};

exports.overrideWindowOnError = overrideWindowOnError;

var restoreWindowOnError = function restoreWindowOnError() {
  window.onerror = onError ? onError.bind({}) : null;
};

exports.restoreWindowOnError = restoreWindowOnError;

var enable = function enable() {
  overrideWindowConsole();
  overrideWindowOnError();
};

var disable = function disable() {
  restoreWindowConsole();
  restoreWindowOnError();
};

var onConsole = function onConsole(callback) {
  return consoleCallback = callback;
};

var _default = {
  enable: enable,
  disable: disable,
  onConsole: onConsole
};
exports["default"] = _default;