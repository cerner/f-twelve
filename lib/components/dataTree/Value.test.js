"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _Value = require("./Value");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Value', function () {
  describe('#getPreview', function () {
    it('should handle strings', function () {
      var preview = (0, _Value.getPreview)('key', 'one');

      _assert["default"].strictEqual(preview, '');
    });
    it('should handle numbers', function () {
      var preview = (0, _Value.getPreview)('key', 1);

      _assert["default"].strictEqual(preview, '');
    });
    it('should handle boolean', function () {
      var preview = (0, _Value.getPreview)('key', true);

      _assert["default"].strictEqual(preview, '');
    });
    it('should handle array', function () {
      var preview = (0, _Value.getPreview)('key', [1, 2, 3]);

      _assert["default"].strictEqual(preview, '[1, 2, 3]');
    });
    it('should handle array of objects', function () {
      var preview = (0, _Value.getPreview)('key', [{
        key: 1
      }, {
        key: 2
      }]);

      _assert["default"].strictEqual(preview, '[{…}, {…}]');
    });
    it('should handle array of arrays', function () {
      var preview = (0, _Value.getPreview)('key', [[1, 2], [3, 4, 5]]);

      _assert["default"].strictEqual(preview, '[[…], […]]');
    });
    it('should handle objects', function () {
      var preview = (0, _Value.getPreview)('key', {
        'one': 1,
        'two': true,
        'three': '3ree'
      });

      _assert["default"].strictEqual(preview, '{one:…, two:…, three:…}');
    });
    it('should handle null', function () {
      var preview = (0, _Value.getPreview)('key', null);

      _assert["default"].strictEqual(preview, '');
    });
    it('should handle undefined', function () {
      var preview = (0, _Value.getPreview)('key', undefined);

      _assert["default"].strictEqual(preview, '');
    });
    it('should handle functions', function () {
      var someFunction = function someFunction(arg) {
        return console.log(arg);
      };

      var preview = (0, _Value.getPreview)('key', someFunction);

      _assert["default"].strictEqual(preview, '');
    });
    it('should handle __proto__', function () {
      var preview = (0, _Value.getPreview)('__proto__', 'anything');

      _assert["default"].strictEqual(preview, '{…}');
    });
  });
});