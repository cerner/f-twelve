"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../utilities/jsx"));

var _CopyButtonModule = _interopRequireDefault(require("./CopyButton.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Copy icon made of CSS rectangles
 */
var _default = function _default(_ref) {
  var getText = _ref.getText,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Copy' : _ref$title;
  return (0, _jsx["default"])("div", {
    className: _CopyButtonModule["default"].copyButton,
    onclick: function onclick(event) {
      return onClickCopy(event, getText);
    },
    title: title
  }, (0, _jsx["default"])("span", {
    className: _CopyButtonModule["default"].successMessage,
    title: "Copied"
  }), (0, _jsx["default"])("div", {
    className: _CopyButtonModule["default"].back
  }), (0, _jsx["default"])("div", {
    className: _CopyButtonModule["default"].front
  }));
};
/**
 * Copy the output of getText() to the clipboard and indicate success
 */


exports["default"] = _default;

var onClickCopy = function onClickCopy(event, getText) {
  var copyButton = event.currentTarget;
  var text = getText(); // Create an invisible textarea with the text, highlight, copy, remove the textarea

  var textArea = (0, _jsx["default"])("textarea", {
    className: _CopyButtonModule["default"].tempTextArea,
    value: text
  });
  copyButton.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  copyButton.removeChild(textArea); // Temporarily show a checkmark instead of the copy icon

  copyButton.classList.add(_CopyButtonModule["default"].showSuccess);
  setTimeout(function () {
    return copyButton.classList.remove(_CopyButtonModule["default"].showSuccess);
  }, 2000);
};