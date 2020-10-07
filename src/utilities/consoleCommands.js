/**
 * Store, retrieve, execute, and parse the Console's command history
 */

const historyKey = 'fTwelve.history';

/**
 * Push a command onto history and write to local storage
 */
export const setHistory = (command, maxSize = 50) => {
  history.unshift(command);
  history.splice(maxSize);
  if (window.localStorage) {
    window.localStorage.setItem(historyKey, JSON.stringify(history));
  }
};

/**
 * Retrieve all history items
 */
export const getHistory = () => window.localStorage
  ? (JSON.parse(window.localStorage.getItem(historyKey)) || [])
  : history || [];

/**
 * Push a console command onto the history array and execute it
 */
export const exec = (command) => {
  setHistory(command);
  window.console.log(command);
  try {
    window.console.log(parseCommand(command));
  } catch (e) {
    window.console.error(e);
  }
};

/**
 * Parse a string and safely evaluate it in JS (as opposed to `eval` or `Function`)
 */
export const parseCommand = (command) => {
  command = command.trim();
  if (command.match(/^".*"$/) || command.match(/^'.*'$/)) {
    return command.slice(1, -1);
  }
  const expressions = command.split(/\s*=\s*/);
  const firstExpression = expressions.shift();
  return firstExpression.replace(/(?=\[)/g, '.').split('.').reduce((object, memberString, idx, array) => {
    const bracketMatch = memberString.match(/^\[([^\]]*)]$/);
    const memberName = bracketMatch ? bracketMatch[1].replace(/^["']|["']$/g, '') : memberString;
    if (expressions.length > 0 && idx === array.length - 1) {
      // If there are things to the right of the equals sign, assign it to the left
      (object || {})[memberName] = parseCommand(expressions.join('='));
    }
    return (object || {})[memberName];
  }, window);
};

/**
 * Array of recently executed commands
 */
const history = getHistory();
