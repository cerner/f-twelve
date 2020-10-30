"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _consoleHook = _interopRequireDefault(require("../utilities/consoleHook"));

var _hooks = require("preact/hooks");

var _Console = require("../components/tabs/console/Console");

/**
 * Subscribe to the consoleHook and provide the latest prepped consoleHook data
 */
var _default = function _default() {
  var reducer = function reducer(rows, row) {
    return [].concat((0, _toConsumableArray2["default"])(rows), [(0, _Console.prepConsoleData)(row)]);
  };

  var _useReducer = (0, _hooks.useReducer)(reducer, []),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      consoleData = _useReducer2[0],
      addConsoleData = _useReducer2[1];

  (0, _hooks.useEffect)(function () {
    // Every time console.log/info/warn/error is called, store the data
    _consoleHook["default"].onConsole(addConsoleData);
  }, []);
  return consoleData;
};

exports["default"] = _default;