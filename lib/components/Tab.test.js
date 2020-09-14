"use strict";

var _jsx = _interopRequireDefault(require("../utilities/jsx"));

var _assert = _interopRequireDefault(require("assert"));

var _Tab = _interopRequireDefault(require("./Tab"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Tab', function () {
  var testVar = 'old';
  before(function () {
    this.tab = (0, _jsx["default"])(_Tab["default"], {
      label: "Test",
      onclick: function onclick() {
        return testVar = 'new';
      }
    });
  });
  describe('#render()', function () {
    it('should set el correctly', function () {
      _assert["default"].strictEqual(this.tab.className, 'tab');

      _assert["default"].strictEqual(this.tab.textContent, 'Test');
    });
    it('should send content on click', function () {
      this.tab.click();

      _assert["default"].strictEqual(testVar, 'new');
    });
  });
});