"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onDetach = exports.onAttach = exports.onKeyUp = exports.onKeyDown = exports.getKeyDownStack = exports.enableKeyboardTrigger = exports.enable = exports.disableKeyboardTrigger = exports.disable = exports.detach = exports.attach = exports.el = void 0;

var _App = _interopRequireDefault(require("./components/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Main F-Twelve API
 */
var app = (0, _App["default"])({
  id: 'f-twelve'
});
var el = app.el;
exports.el = el;
var customOnAttach;
var customOnDetach;
var keyDownStack;
var attached;
var active;

var enable = function enable() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$show = _ref.show,
      show = _ref$show === void 0 ? true : _ref$show;

  active = true;

  if (show) {
    attach();
  }

  enableKeyboardTrigger();
  app.console.overrideWindowConsole();
  app.console.overrideWindowOnError();
};

exports.enable = enable;

var disable = function disable() {
  active = false;
  detach();
  disableKeyboardTrigger();
  app.console.restoreWindowConsole();
  app.console.restoreWindowOnError();
};

exports.disable = disable;

var attach = function attach() {
  if (attached === true || active !== true) {
    return;
  }

  var body = document.getElementsByTagName('body')[0];
  body.appendChild(el);
  attached = true;

  if (typeof customOnAttach === 'function') {
    customOnAttach();
  }
};

exports.attach = attach;

var detach = function detach() {
  if (attached !== true) {
    return;
  }

  el.parentNode.removeChild(el);
  attached = false;

  if (typeof customOnDetach === 'function') {
    customOnDetach();
  }
};

exports.detach = detach;

var enableKeyboardTrigger = function enableKeyboardTrigger() {
  keyDownStack = '';
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
};

exports.enableKeyboardTrigger = enableKeyboardTrigger;

var disableKeyboardTrigger = function disableKeyboardTrigger() {
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
};

exports.disableKeyboardTrigger = disableKeyboardTrigger;

var onKeyDown = function onKeyDown(event) {
  keyDownStack += event.key;

  if (event.key === 'F12' || keyDownStack.toUpperCase() !== 'F12') {
    return;
  }

  if (attached) {
    detach();
  } else {
    attach();
  }
};

exports.onKeyDown = onKeyDown;

var onKeyUp = function onKeyUp() {
  keyDownStack = '';
};

exports.onKeyUp = onKeyUp;

var getKeyDownStack = function getKeyDownStack() {
  return keyDownStack;
};

exports.getKeyDownStack = getKeyDownStack;

var onAttach = function onAttach(callback) {
  return customOnAttach = callback;
};

exports.onAttach = onAttach;

var onDetach = function onDetach(callback) {
  return customOnDetach = callback;
};

exports.onDetach = onDetach;