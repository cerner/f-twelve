"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../../../utilities/jsx"));

var _AppModule = _interopRequireDefault(require("../../App.module.scss"));

var _ConsoleModule = _interopRequireDefault(require("./Console.module.scss"));

var _Output = _interopRequireDefault(require("./Output"));

var _Prompt = _interopRequireDefault(require("./Prompt"));

var _parseCommand = _interopRequireDefault(require("../../../utilities/parseCommand"));

var _parseStack = _interopRequireDefault(require("../../../utilities/parseStack"));

var _CopyButton = _interopRequireDefault(require("../../CopyButton"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * The content of the Console tab
 */
var historyKey = 'fTwelve.history';
var originalConsole = Object.assign({}, window.console);
var originalOnError = window.onerror && typeof window.onerror === 'function' ? window.onerror.bind({}) : null;

var _default = function _default() {
  var output;

  var getHistory = function getHistory() {
    return window.localStorage ? JSON.parse(window.localStorage.getItem(historyKey)) || [] : execHistory || [];
  };

  var setHistory = function setHistory(command) {
    var maxSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    execHistory.unshift(command);
    execHistory.splice(maxSize);

    if (window.localStorage) {
      window.localStorage.setItem(historyKey, JSON.stringify(execHistory));
    }
  };

  var overrideWindowConsole = function overrideWindowConsole() {
    var verbs = ['log', 'warn', 'error', 'info'];
    verbs.forEach(function (verb) {
      window.console[verb] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var isError = args.length === 1 && args[0] instanceof Error;
        var stackPreFtwelve = getStack().split('\n').splice(3).join('\n');
        var stack = (0, _parseStack["default"])(isError ? args[0].stack : stackPreFtwelve);
        output.append({
          verb: verb,
          args: args,
          stack: stack
        });
        return originalConsole[verb] && originalConsole[verb].apply(window.console, args);
      };
    });
  };
  /**
   * Only way to get a stack in IE is throw an actual error!
   */


  var getStack = function getStack() {
    try {
      throw Error();
    } catch (error) {
      return error.stack || '';
    }
  };

  var restoreWindowConsole = function restoreWindowConsole() {
    window.console = Object.assign({}, originalConsole);
  };

  var overrideWindowOnError = function overrideWindowOnError() {
    window.onerror = function (message, source, lineNo, colNo, error) {
      if (originalOnError && typeof originalOnError === 'function') {
        originalOnError.call(_this, message, source, lineNo, colNo, error);
      }

      console.error(error);
      return true;
    };
  };

  var restoreWindowOnError = function restoreWindowOnError() {
    window.onerror = originalOnError ? originalOnError.bind({}) : null;
  };

  var exec = function exec(command) {
    setHistory(command);
    console.log(command);

    try {
      console.log((0, _parseCommand["default"])(command));
    } catch (e) {
      console.error(e);
    }
  };

  var execHistory = getHistory();
  return {
    exec: exec,
    getHistory: getHistory,
    overrideWindowConsole: overrideWindowConsole,
    overrideWindowOnError: overrideWindowOnError,
    restoreWindowConsole: restoreWindowConsole,
    restoreWindowOnError: restoreWindowOnError,
    setHistory: setHistory,
    el: (0, _jsx["default"])("div", {
      className: _AppModule["default"].content
    }, (0, _jsx["default"])(_Output["default"], {
      ref: function ref(_ref) {
        return output = _ref;
      }
    }), (0, _jsx["default"])("div", {
      className: _ConsoleModule["default"].copyAllButton
    }, (0, _jsx["default"])(_CopyButton["default"], {
      getText: output.toJson,
      title: "Copy all output"
    })), (0, _jsx["default"])(_Prompt["default"], {
      exec: exec,
      getHistory: getHistory
    }))
  };
};

exports["default"] = _default;