"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(stack) {
  try {
    return stack.split('\n').map(function (line) {
      return {
        path: (line.match(/^( *at )(.*)/) || [])[2],
        url: (line.match(/(http:\/\/.*?):\d+:\d+/) || [])[1],
        fileName: (line.match(/.+[\\/(](.*?\.\w+)/) || [])[1],
        lineNumber: (line.split(':').slice(-2, -1) || [])[0],
        columnNumber: (line.split(':').slice(-1)[0].match(/\d+/) || [])[0]
      };
    }).filter(function (frame) {
      return frame.path;
    });
  } catch (e) {
    return [];
  }
};

exports["default"] = _default;