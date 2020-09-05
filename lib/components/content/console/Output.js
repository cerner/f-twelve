"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../../../utilities/jsx"));

var _ConsoleModule = _interopRequireDefault(require("./Console.module.scss"));

var _Node = _interopRequireDefault(require("../../dataTree/Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
    var tzOffset = new Date().getTimezoneOffset() * 60000;
    var timestamp = new Date(Date.now() - tzOffset).toISOString().slice(11, 23);
    var frame = stack && stack[0] || {};
    var fileName = frame.fileName && frame.lineNumber ? "".concat(frame.fileName, ":").concat(frame.lineNumber) : frame.fileName || '';
    var argElements = Object.keys(args).map(function (key) {
      var arg = args[key];
      var isError = arg instanceof Error || arg && arg.constructor && arg.constructor.name && arg.constructor.name.indexOf('Error') > -1;
      return (0, _jsx["default"])(_Node["default"], {
        data: isError ? arg.stack || arg : arg
      });
    });
    var row = (0, _jsx["default"])("div", {
      className: "".concat(_ConsoleModule["default"].row, " ").concat(_ConsoleModule["default"][verb])
    }, (0, _jsx["default"])("div", {
      className: _ConsoleModule["default"].timestamp
    }, timestamp), (0, _jsx["default"])("div", {
      className: _ConsoleModule["default"].consoleArgs
    }, _toConsumableArray(argElements)), (0, _jsx["default"])("a", {
      className: _ConsoleModule["default"].fileName,
      href: frame.url,
      title: stack.map(function (frame) {
        return frame.path;
      }).join('\n')
    }, fileName));
    el.appendChild(row);

    if (row.scrollIntoView) {
      row.scrollIntoView();
    }
  };

  return {
    append: append,
    el: el
  };
};

exports["default"] = _default;