"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./polyfills/index");

var _api = require("./api");

/**
 * Enable F-Twelve and return public API
 */
(0, _api.enable)({
  show: false
});

var _default = Object.freeze({
  enable: _api.enable,
  disable: _api.disable,
  hide: _api.detach,
  show: _api.attach,
  onHide: _api.onDetach,
  onShow: _api.onAttach
});

exports["default"] = _default;