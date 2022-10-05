"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onDetach = exports.onAttach = exports.onKeyUp = exports.onKeyDown = exports.getKeyDownStack = exports.enableKeyboardTrigger = exports.enable = exports.disableKeyboardTrigger = exports.disable = exports.detach = exports.attach = exports.el = void 0;

var _preact = require("preact");

var _App = _interopRequireDefault(require("./components/App"));

var _xhrHook = _interopRequireDefault(require("./utilities/xhrHook"));

var _consoleHook = _interopRequireDefault(require("./utilities/consoleHook"));

/**
 * Main F-Twelve API
 */
// Render the app right away so it is functional even if it's not attached
var el = document.createElement('div');
exports.el = el;
el.id = 'f-twelve';
(0, _preact.render)((0, _preact.h)(_App["default"], null), el);
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

  _consoleHook["default"].enable();

  _xhrHook["default"].enable();
};

exports.enable = enable;

var disable = function disable() {
  active = false;
  detach();
  disableKeyboardTrigger();

  _consoleHook["default"].disable();

  _xhrHook["default"].disable();
};

exports.disable = disable;

var attach = function attach() {
  if (attached === true || active !== true) {
    return;
  }

  document.body.appendChild(el);
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

  document.body.removeChild(el);
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
  var legacyF12 = event.key !== 'F12' && keyDownStack.toUpperCase() === 'F12';
  var ctrlF12 = event.key === 'F12' && event.ctrlKey;

  if (!legacyF12 && !ctrlF12) {
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