"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var parseCommand = function parseCommand(command) {
  command = command.trim();

  if (command.match(/^".*"$/) || command.match(/^'.*'$/)) {
    return command.slice(1, -1);
  }

  var expressions = command.split(/\s*=\s*/);
  var firstExpression = expressions.shift();
  return firstExpression.replace(/(?=\[)/g, '.').split('.').reduce(function (object, memberString, idx, array) {
    var bracketMatch = memberString.match(/^\[([^\]]*)]$/);
    var memberName = bracketMatch ? bracketMatch[1].replace(/^["']|["']$/g, '') : memberString;

    if (expressions.length > 0 && idx === array.length - 1) {
      // If there are things to the right of the equals sign, assign it to the left
      (object || {})[memberName] = parseCommand(expressions.join('='));
    }

    return (object || {})[memberName];
  }, window);
};

var _default = parseCommand;
exports["default"] = _default;