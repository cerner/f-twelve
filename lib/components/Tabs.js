"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../utilities/jsx"));

var _Tab = _interopRequireDefault(require("./Tab"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Tab bar with content
 */
var _default = function _default(_ref) {
  var console = _ref.console,
      setContent = _ref.setContent;
  return (0, _jsx["default"])('fragment', null, (0, _jsx["default"])(_Tab["default"], {
    label: "Console",
    onclick: function onclick() {
      return setContent(console);
    }
  }));
};

exports["default"] = _default;