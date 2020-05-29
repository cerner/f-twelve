"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../utilities/jsx"));

var _AppModule = _interopRequireDefault(require("./App.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Single tab for the tab bar
 */
var _default = function _default(_ref) {
  var label = _ref.label,
      onclick = _ref.onclick;
  return (0, _jsx["default"])("div", {
    className: _AppModule["default"].tab,
    onclick: onclick
  }, label);
};

exports["default"] = _default;