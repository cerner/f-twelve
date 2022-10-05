"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _preact = require("preact");

var _CopyButtonModule = _interopRequireDefault(require("./CopyButton.module.scss"));

var _hooks = require("preact/hooks");

/**
 * Copy icon made of CSS rectangles
 */
var _default = function _default(_ref) {
  var getText = _ref.getText,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Copy' : _ref$title;
  var ref = (0, _preact.createRef)();

  var _useState = (0, _hooks.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      success = _useState2[0],
      setSucces = _useState2[1];
  /**
   * Copy the output of getText() to the clipboard and indicate success
   */


  var onClick = function onClick() {
    // Create an invisible textarea with the text, highlight, copy, remove the textarea
    var textArea = document.createElement('textarea');
    textArea.classList.add(_CopyButtonModule["default"].tempTextArea);
    textArea.value = getText();
    ref.current.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    ref.current.removeChild(textArea); // Temporarily show a checkmark on the copy icon

    setSucces(true);
    setTimeout(function () {
      return setSucces(false);
    }, 2000);
  };

  return (0, _preact.h)("div", {
    className: _CopyButtonModule["default"].copyButton,
    onClick: onClick,
    ref: ref,
    title: title
  }, (0, _preact.h)("div", {
    className: _CopyButtonModule["default"].back
  }), (0, _preact.h)("div", {
    className: _CopyButtonModule["default"].front
  }), success && (0, _preact.h)("span", {
    className: _CopyButtonModule["default"].successMessage,
    title: "Copied"
  }, "\u2714"));
};

exports["default"] = _default;