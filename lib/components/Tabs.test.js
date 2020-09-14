"use strict";

var _jsx = _interopRequireDefault(require("../utilities/jsx"));

var _assert = _interopRequireDefault(require("assert"));

var _Tabs = _interopRequireDefault(require("./Tabs"));

var _Console = _interopRequireDefault(require("./content/console/Console"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Tabs', function () {
  var testVar = 'old';
  before(function () {
    this.tabs = (0, _jsx["default"])(_Tabs["default"], {
      console: (0, _jsx["default"])(_Console["default"], null),
      setContent: function setContent() {
        return testVar = 'new';
      }
    });
  });
  describe('#getTabs()', function () {
    it('should contain an array of only Tab elements', function () {
      this.tabs.forEach(function (child) {
        return _assert["default"].strictEqual(child.className, 'tab');
      });
    });
    it('should assign setContent on click', function () {
      this.tabs.forEach(function (child) {
        testVar = 'old';
        child.click();

        _assert["default"].strictEqual(testVar, 'new', 'Tab missing onClick: ' + child.innerText);
      });
    });
  });
});