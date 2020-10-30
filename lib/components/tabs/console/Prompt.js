"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _PromptModule = _interopRequireDefault(require("./Prompt.module.scss"));

/**
 * Console tab input
 */
var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      exec = _ref.exec,
      getHistory = _ref.getHistory;

  var inputEl = (0, _preact.createRef)();
  var historyPos = -1;
  var currentInput = '';

  var onKeyDown = function onKeyDown(event) {
    if (event.key === 'Enter' && inputEl.current.value) {
      executeCommand(inputEl.current.value);
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      retrieveHistory();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      retrieveHistory(true);
    }
  };

  var onChange = function onChange(event) {
    historyPos = -1;
    currentInput = inputEl.current.value;
  };

  var executeCommand = function executeCommand(command) {
    exec(command);
    historyPos = -1;
    currentInput = '';
    inputEl.current.value = '';
  };

  var retrieveHistory = function retrieveHistory() {
    var reverse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var history = getHistory();

    if (reverse) {
      historyPos = Math.max(--historyPos, -1);
    } else {
      historyPos = Math.min(++historyPos, history.length - 1);
    }

    inputEl.current.value = historyPos === -1 ? currentInput : history[historyPos] || '';
  };

  return (0, _preact.h)("div", {
    className: _PromptModule["default"].prompt
  }, (0, _preact.h)("div", {
    className: _PromptModule["default"].promptChar
  }, "\u203A"), (0, _preact.h)("input", {
    className: _PromptModule["default"].promptInput,
    onChange: onChange,
    onInput: onChange,
    onKeyDown: onKeyDown,
    onPaste: onChange,
    ref: inputEl
  }));
};

exports["default"] = _default;