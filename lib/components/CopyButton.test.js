"use strict";

var _jsx = _interopRequireDefault(require("../utilities/jsx"));

var _assert = _interopRequireDefault(require("assert"));

var _CopyButton = _interopRequireDefault(require("./CopyButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Unable to read or write to the clipboard in unit tests
 */
describe('CopyButton', function () {
  var lastExecCommand;
  beforeEach(function () {
    lastExecCommand = null;

    global.document.execCommand = function (command) {
      return lastExecCommand = command;
    };
  });
  describe('#onClickCopy()', function () {
    it('should call execCommand with "copy"', function () {
      var copyButton = (0, _jsx["default"])(_CopyButton["default"], {
        getText: function getText() {
          return 'some text';
        }
      });
      copyButton.click();

      _assert["default"].strictEqual(lastExecCommand, 'copy');
    });
    it('should display success after successful copy', function () {
      var copyButton = (0, _jsx["default"])(_CopyButton["default"], {
        getText: function getText() {
          return 'some text';
        }
      });
      copyButton.click();

      _assert["default"].strictEqual(copyButton.classList.contains('showSuccess'), true);
    });
    it('should not display success after a failed copy', function () {
      var text = 'some text';
      var copyButton = (0, _jsx["default"])(_CopyButton["default"], {
        getText: function getText() {
          return text;
        }
      });

      global.document.execCommand = function () {
        return x = error;
      }; // eslint-disable-line no-undef


      try {
        copyButton.click();
      } catch (e) {// Do nothing
      }

      _assert["default"].strictEqual(copyButton.classList.contains('showSuccess'), false);
    });
  });
});