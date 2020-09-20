"use strict";

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('App', function () {
  describe('#setContent()', function () {
    it('should call setContent and toggle content visibility when a tab is clicked', function () {
      var _this = this;

      var tabs = Array.from(this.fTwelve.el.getElementsByClassName('tab'));
      tabs.forEach(function (tab) {
        var message = 'Clicked tab did not toggle content visibility: ' + tab.innerText;
        tab.click();

        _assert["default"].strictEqual(_this.fTwelve.el.getElementsByClassName('content').length, 1, message);

        tab.click();

        _assert["default"].strictEqual(_this.fTwelve.el.getElementsByClassName('content').length, 0, message);
      });
    });
  });
});