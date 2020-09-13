"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _Output = _interopRequireDefault(require("./Output"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Output', function () {
  beforeEach(function () {
    this.el.innerHTML = '';
  });
  before(function () {
    var _this = this;

    this.output = (0, _Output["default"])();
    this.el = this.output.el;

    this.testAppendStrings = function (verb) {
      var args = ['string1', 'string2', 'has a\nnewline', '👍'];

      _this.output.append({
        verb: verb,
        args: args
      }); // Verify 1 row


      var logs = _this.el.getElementsByClassName(verb);

      _assert["default"].strictEqual(logs.length, 1); // Verify 1 element per console arg


      var argEl = logs[0].getElementsByClassName('consoleArgs')[0];
      var argNodes = argEl.childNodes;

      _assert["default"].strictEqual(argNodes.length, args.length); // Verify the output matches the input


      var idx = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = argNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;

          _assert["default"].strictEqual(node.textContent, args[idx++]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    };

    this.testAppendObjects = function (verb) {
      var circular = {
        circular: undefined
      };
      circular.circular = circular;
      var largeArray = new Array(51).fill(0);
      var args = [{
        key: 'value'
      }, [1, '2', 'three'], largeArray, circular, {
        undefined: undefined
      }];

      _this.output.append({
        verb: verb,
        args: args
      }); // Verify 1 row


      var logs = _this.el.getElementsByClassName(verb);

      _assert["default"].strictEqual(logs.length, 1); // Verify 1 element per console arg


      var argEl = logs[0].getElementsByClassName('consoleArgs')[0];
      var argNodes = argEl.childNodes;

      _assert["default"].strictEqual(argNodes.length, args.length); // Verify the output matches the input


      var idx = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = argNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var node = _step2.value;
          var data = args[idx++];

          if (Array.isArray(data)) {
            _assert["default"].strictEqual(node.textContent, "Array(".concat(data.length, ")"));
          } else {
            _assert["default"].strictEqual(node.textContent, "Object(".concat(Object.keys(data).length, ")"));
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    };
  });
  describe('#append()', function () {
    it('should append log strings', function () {
      this.testAppendStrings('log');
    });
    it('should append log objects', function () {
      this.testAppendObjects('log');
    });
    it('should append warn strings', function () {
      this.testAppendStrings('warn');
    });
    it('should append warn objects', function () {
      this.testAppendObjects('warn');
    });
    it('should append info strings', function () {
      this.testAppendStrings('info');
    });
    it('should append info objects', function () {
      this.testAppendObjects('info');
    });
    it('should append error strings', function () {
      this.testAppendStrings('error');
    });
    it('should append error objects', function () {
      this.testAppendObjects('error');
    });
    it('should display filename and line number from top of stack', function () {
      var stack = [{
        fileName: 'fileX',
        lineNumber: 42
      }];
      this.output.append({
        verb: 'log',
        args: ['test'],
        stack: stack
      });
      var printedFileName = this.el.getElementsByClassName('fileName')[0].textContent;

      _assert["default"].strictEqual(printedFileName, 'fileX:42');
    });
    it('should display filename only if no line number', function () {
      var stack = [{
        fileName: 'fileX'
      }];
      this.output.append({
        verb: 'log',
        args: ['test'],
        stack: stack
      });
      var printedFileName = this.el.getElementsByClassName('fileName')[0].textContent;

      _assert["default"].strictEqual(printedFileName, 'fileX');
    });
    it('should not display filename if not available ', function () {
      var stack = [{
        lineNumber: 42
      }];
      this.output.append({
        verb: 'log',
        args: ['test'],
        stack: stack
      });
      var printedFileName = this.el.getElementsByClassName('fileName')[0].textContent;

      _assert["default"].strictEqual(printedFileName, '');
    });
    it('should link filename to url from top of stack', function () {
      var url = 'http://test.com/';
      this.output.append({
        verb: 'log',
        args: ['test'],
        stack: [{
          url: url
        }]
      });
      var fileNameHref = this.el.getElementsByClassName('fileName')[0].href;

      _assert["default"].strictEqual(fileNameHref, url);
    });
  });
  describe('#onClickExpandIcon()', function () {
    it('should display children on click', function () {
      this.output.append({
        args: [{
          key: 'value'
        }]
      });
      var args = this.el.getElementsByClassName('consoleArgs');

      _assert["default"].strictEqual(args.length, 1, this.setupError);

      var arg = args[0];

      _assert["default"].strictEqual(arg.getElementsByClassName('child').length, 0);

      arg.getElementsByClassName('caret')[0].click();
      (0, _assert["default"])(arg.getElementsByClassName('child').length > 0);
    });
    it('should remove children on click', function () {
      this.output.append({
        args: [{
          key: 'value'
        }]
      });
      var args = this.el.getElementsByClassName('consoleArgs');

      _assert["default"].strictEqual(args.length, 1, this.setupError);

      var arg = args[0];
      (0, _assert["default"])(arg.getElementsByClassName('child').length === 0, this.setupError);
      arg.getElementsByClassName('caret')[0].click();
      (0, _assert["default"])(arg.getElementsByClassName('child').length > 0, this.setupError);
      arg.getElementsByClassName('caret')[0].click();
      (0, _assert["default"])(arg.getElementsByClassName('child').length === 0);
    });
  });
});