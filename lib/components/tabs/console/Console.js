"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCommand = exports.exec = exports.getHistory = exports.setHistory = exports.toJson = exports.prepConsoleData = exports["default"] = void 0;

var _preact = require("preact");

var _hooks = require("preact/hooks");

var _ConsoleModule = _interopRequireDefault(require("./Console.module.scss"));

var _Prompt = _interopRequireDefault(require("./Prompt"));

var _CopyButton = _interopRequireDefault(require("../../CopyButton"));

var _getTimestamp = _interopRequireDefault(require("../../../utilities/getTimestamp"));

var _Tree = _interopRequireWildcard(require("../../dataTree/Tree"));

/**
 * The content and logic for the Console tab
 */
var _default = function _default(_ref) {
  var consoleData = _ref.consoleData;
  // Scroll to the bottom on render
  var outputRef = (0, _preact.createRef)();
  (0, _hooks.useEffect)(function () {
    return outputRef.current.scrollTop = outputRef.current.scrollHeight;
  });
  return (0, _preact.h)("div", {
    className: _ConsoleModule["default"].console
  }, (0, _preact.h)("div", {
    className: _ConsoleModule["default"].output,
    ref: outputRef
  }, consoleData.map(function (row) {
    return (0, _preact.h)("div", {
      className: "".concat(_ConsoleModule["default"].row, " ").concat(_ConsoleModule["default"][row.level])
    }, (0, _preact.h)("div", {
      className: _ConsoleModule["default"].timestamp
    }, row.timestamp.split(' ')[1]), (0, _preact.h)("div", {
      className: _ConsoleModule["default"].consoleArgs
    }, row.argData.map(function (dataTree) {
      return (0, _preact.h)(_Tree["default"], {
        dataTree: dataTree
      });
    })), (0, _preact.h)("div", {
      className: _ConsoleModule["default"].fileName
    }, (0, _preact.h)(_CopyButton["default"], {
      getText: function getText() {
        return row.stackString;
      },
      title: "Copy stack"
    }), (0, _preact.h)("span", {
      title: row.stackString
    }, row.fileName)));
  })), (0, _preact.h)("div", {
    className: _ConsoleModule["default"].copyAllButton
  }, (0, _preact.h)(_CopyButton["default"], {
    getText: function getText() {
      return toJson(consoleData);
    },
    title: "Copy all output"
  })), (0, _preact.h)(_Prompt["default"], {
    exec: exec,
    getHistory: getHistory
  }));
};
/**
 * Add additional info to the console args provided by the consoleHook
 */


exports["default"] = _default;

var prepConsoleData = function prepConsoleData(_ref2) {
  var _ref2$level = _ref2.level,
      level = _ref2$level === void 0 ? 'log' : _ref2$level,
      args = _ref2.args,
      _ref2$stack = _ref2.stack,
      stack = _ref2$stack === void 0 ? [] : _ref2$stack;
  var timestamp = (0, _getTimestamp["default"])();
  var frame = stack && stack[0] || {};
  var fileName = frame.fileName && frame.lineNumber ? "".concat(frame.fileName, ":").concat(frame.lineNumber) : frame.fileName || '';
  var argData = Object.keys(args).map(function (key) {
    var arg = args[key];
    var isError = arg instanceof Error || arg && arg.constructor && arg.constructor.name && arg.constructor.name.indexOf('Error') > -1;
    return (0, _Tree.getNode)(isError ? arg.stack || arg : arg);
  });
  return {
    argData: argData,
    fileName: fileName,
    level: level,
    stack: stack,
    stackString: stack.map(function (frame) {
      return frame.path;
    }).join('\n'),
    timestamp: timestamp
  };
};
/**
 * Generate a json representation of the console data
 */


exports.prepConsoleData = prepConsoleData;

var toJson = function toJson(consoleData) {
  return JSON.stringify({
    userAgent: navigator.userAgent,
    href: window.location.href,
    time: (0, _getTimestamp["default"])(),
    consoleOutput: consoleData.map(function (row) {
      var argData = row.argData.map(function (dataTree) {
        return JSON.parse(dataTree.toJson());
      });
      return {
        time: row.timestamp,
        stack: row.stack,
        output: argData
      };
    })
  });
};
/**
 * Local storage key for command history
 */


exports.toJson = toJson;
var historyKey = 'fTwelve.history';
/**
 * Push a command onto history and write to local storage
 */

var setHistory = function setHistory(command) {
  var maxSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  history.unshift(command);
  history.splice(maxSize);

  if (window.localStorage) {
    window.localStorage.setItem(historyKey, JSON.stringify(history));
  }
};
/**
 * Retrieve all history items
 */


exports.setHistory = setHistory;

var getHistory = function getHistory() {
  return window.localStorage ? JSON.parse(window.localStorage.getItem(historyKey)) || [] : history || [];
};
/**
 * Push a console command onto the history array and execute it
 */


exports.getHistory = getHistory;

var exec = function exec(command) {
  setHistory(command);
  window.console.log(command);

  try {
    window.console.log(parseCommand(command));
  } catch (e) {
    window.console.error(e);
  }
};
/**
 * Parse a string and safely evaluate it in JS (as opposed to `eval` or `Function`)
 */


exports.exec = exec;

var parseCommand = function parseCommand(command) {
  command = command.trim();

  if (command.match(/^".*"$/) || command.match(/^'.*'$/)) {
    return command.slice(1, -1);
  }

  var expressions = command.split(/\s*=\s*/);
  var firstExpression = expressions.shift();
  return firstExpression.replace(/(?=\[)/g, '.').split('.').reduce(function (object, memberString, idx, array) {
    var bracketMatch = memberString.match(/^\[([^\]]*)]$/);
    var memberName = bracketMatch ? bracketMatch[1].replace(/^["']|["']$/g, '') : memberString;

    if (expressions.length > 0 && idx === array.length - 1) {
      // If there are things to the right of the equals sign, assign it to the left
      (object || {})[memberName] = parseCommand(expressions.join('='));
    }

    return (object || {})[memberName];
  }, window);
};
/**
 * Array of recently executed commands
 */


exports.parseCommand = parseCommand;
var history = getHistory();