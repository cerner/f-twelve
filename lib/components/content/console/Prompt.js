"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../../../utilities/jsx"));

var _ConsoleModule = _interopRequireDefault(require("./Console.module.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Console tab input
 */
var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      inputRef = _ref.inputRef,
      exec = _ref.exec,
      getHistory = _ref.getHistory;

  var historyPos = -1;
  var currentInput = '';
  var inputEl;

  var onKeyDown = function onKeyDown(event) {
    if (event.key === 'Enter' && inputEl.value) {
      executeCommand(inputEl.value);
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      retrieveHistory();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      retrieveHistory(true);
    }
  };

  var onChange = function onChange(_) {
    historyPos = -1;
    currentInput = inputEl.value;
  };

  var executeCommand = function executeCommand(command) {
    exec(command);
    historyPos = -1;
    currentInput = '';
    inputEl.value = '';
  };

  var retrieveHistory = function retrieveHistory() {
    var reverse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var history = getHistory();

    if (reverse) {
      historyPos = Math.max(--historyPos, -1);
    } else {
      historyPos = Math.min(++historyPos, history.length - 1);
    }

    inputEl.value = historyPos === -1 ? currentInput : history[historyPos] || '';
  };

  var Prompt = (0, _jsx["default"])("div", {
    className: _ConsoleModule["default"].prompt
  }, (0, _jsx["default"])("div", {
    className: _ConsoleModule["default"].promptChar
  }, "\u203A"), (0, _jsx["default"])("input", {
    className: _ConsoleModule["default"].promptInput,
    onchange: onChange,
    oninput: onChange,
    onkeydown: onKeyDown,
    onpaste: onChange,
    ref: function ref(el) {
      return inputEl = el;
    }
  })); // Provide a ref to the input box

  if (typeof inputRef === 'function') inputRef(inputEl);
  return Prompt;
};

exports["default"] = _default;