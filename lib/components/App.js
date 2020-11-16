"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../utilities/jsx"));

var _AppModule = _interopRequireDefault(require("./App.module.scss"));

var _Tabs = _interopRequireDefault(require("./Tabs"));

var _Console = _interopRequireDefault(require("./content/console/Console"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Root app view
 */
var _default = function _default(_ref) {
  var id = _ref.id;
  var contentWrapper;
  var content;
  var console = (0, _Console["default"])();

  var setContent = function setContent(el) {
    if (content) {
      contentWrapper.removeChild(content);
    }

    if (!el.isSameNode(content)) {
      contentWrapper.appendChild(el);
      content = el;
    } else {
      content = undefined;
    }
  };

  return {
    console: console,
    el: (0, _jsx["default"])("div", {
      className: _AppModule["default"].fTwelve,
      id: id
    }, (0, _jsx["default"])(_Tabs["default"], {
      console: console.el,
      setContent: setContent
    }), (0, _jsx["default"])("div", {
      ref: function ref(el) {
        return contentWrapper = el;
      }
    }))
  };
};

exports["default"] = _default;