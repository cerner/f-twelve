"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../../../utilities/jsx"));

var _OutputModule = _interopRequireDefault(require("./Output.module.scss"));

var _Tree = _interopRequireDefault(require("../../dataTree/Tree"));

var _getTimestamp = _interopRequireDefault(require("../../../utilities/getTimestamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var outputData = [];
/**
 * Console tab output
 */

var _default = function _default() {
  var el = (0, _jsx["default"])("div", {
    className: _OutputModule["default"].output
  });

  var append = function append(_ref) {
    var _ref$verb = _ref.verb,
        verb = _ref$verb === void 0 ? 'log' : _ref$verb,
        args = _ref.args,
        _ref$stack = _ref.stack,
        stack = _ref$stack === void 0 ? [] : _ref$stack;
    var timestamp = (0, _getTimestamp["default"])();
    var frame = stack && stack[0] || {};
    var fileName = frame.fileName && frame.lineNumber ? "".concat(frame.fileName, ":").concat(frame.lineNumber) : frame.fileName || '';
    var treeData = [];
    var argElements = Object.keys(args).map(function (key) {
      var arg = args[key];
      var isError = arg instanceof Error || arg && arg.constructor && arg.constructor.name && arg.constructor.name.indexOf('Error') > -1;
      return (0, _jsx["default"])(_Tree["default"], {
        data: isError ? arg.stack || arg : arg,
        ref: function ref(_ref2) {
          return treeData.push(_ref2.dataTree);
        }
      });
    });
    var row = (0, _jsx["default"])("div", {
      className: "".concat(_OutputModule["default"].row, " ").concat(_OutputModule["default"][verb])
    }, (0, _jsx["default"])("div", {
      className: _OutputModule["default"].timestamp
    }, timestamp.split(' ')[1]), (0, _jsx["default"])("div", {
      className: _OutputModule["default"].consoleArgs
    }, _toConsumableArray(argElements)), (0, _jsx["default"])("a", {
      className: _OutputModule["default"].fileName,
      href: frame.url,
      title: stack.map(function (frame) {
        return frame.path;
      }).join('\n')
    }, fileName)); // Append do the DOM

    el.appendChild(row);

    if (row.scrollIntoView) {
      row.scrollIntoView();
    } // Append to the data variable


    outputData.push({
      timestamp: timestamp,
      stack: stack,
      treeData: treeData
    });
  };

  var toJson = function toJson() {
    return JSON.stringify({
      userAgent: navigator.userAgent,
      href: window.location.href,
      time: (0, _getTimestamp["default"])(),
      consoleOutput: outputData.map(function (rowData) {
        var treeData = rowData.treeData.map(function (tree) {
          return JSON.parse(tree.toJson());
        });
        return {
          time: rowData.timestamp,
          stack: rowData.stack,
          output: treeData
        };
      })
    });
  };

  return {
    append: append,
    toJson: toJson,
    el: el
  };
};

exports["default"] = _default;