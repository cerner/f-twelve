"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _preact = require("preact");

var _ResizerModule = _interopRequireDefault(require("./Resizer.module.scss"));

var _hooks = require("preact/hooks");

var _className = _interopRequireDefault(require("../utilities/className"));

/**
 * Add a line that can be clicked and dragged to resize a target element
 * Defaults to height but also supports width
 */
var _default = function _default(_ref) {
  var defaultSize = _ref.defaultSize,
      targetRef = _ref.targetRef,
      _ref$resizeWidth = _ref.resizeWidth,
      resizeWidth = _ref$resizeWidth === void 0 ? false : _ref$resizeWidth;

  var _useState = (0, _hooks.useState)(defaultSize),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      size = _useState2[0],
      setSize = _useState2[1];

  var getSizeStyleProperty = function getSizeStyleProperty() {
    if (targetRef.current.parentElement && getComputedStyle(targetRef.current.parentElement).display === 'flex') {
      return 'flex-basis';
    } else {
      return resizeWidth ? 'width' : 'height';
    }
  };

  var onMouseDown = function onMouseDown(event) {
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mouseup', onMouseUp, false);
  };

  var onMouseMove = function onMouseMove(event) {
    var maxSize = resizeWidth ? Math.min(window.innerWidth - 20, event.clientX) : Math.min(window.innerHeight, window.innerHeight - event.clientY);
    var size = "".concat(Math.max(maxSize, 4), "px");
    targetRef.current && (targetRef.current.style[getSizeStyleProperty()] = size);
  };

  var onMouseUp = function onMouseUp(event) {
    window.removeEventListener('mousemove', onMouseMove, false);
    window.removeEventListener('mouseup', onMouseUp, false);
    setSize(parseFloat(targetRef.current.style[getSizeStyleProperty()]) || defaultSize);
  };

  var classname = (0, _className["default"])(_ResizerModule["default"].resizer, resizeWidth ? _ResizerModule["default"].widthMode : _ResizerModule["default"].heightMode);
  var resizer = (0, _preact.h)("div", {
    className: classname,
    onMouseDown: onMouseDown
  });
  return [resizer, size];
};

exports["default"] = _default;