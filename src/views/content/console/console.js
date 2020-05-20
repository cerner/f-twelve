/* eslint-disable no-console */
import dom from '../../../utilities/dom'; // eslint-disable-line no-unused-vars
import styles from '../../App.module.css';
import Output from './output';
import Prompt from './prompt';

/**
 * The content of the Console tab
 */

const historyKey = 'fTwelve.history';
const originalConsole = Object.assign({}, window.console);
const originalOnError = window.onerror && typeof window.onerror === 'function' ? window.onerror.bind({}) : null;

const getHistory = () => {
  return window.localStorage
    ? (JSON.parse(window.localStorage.getItem(historyKey)) || [])
    : execHistory || [];
};

const setHistory = (command, maxSize = 50) => {
  execHistory.unshift(command);
  execHistory.splice(maxSize);
  if (window.localStorage) {
    window.localStorage.setItem(historyKey, JSON.stringify(execHistory));
  }
};

const parseStack = (stack) => {
  return stack.split('\n').map((line) => ({
    path: (line.match(/^( *at )(.*)/) || [])[2],
    url: (line.match(/(http:\/\/.*?):\d+:\d+/) || [])[1],
    fileName: (line.match(/.+[\\/(](.*?\.\w+)/) || [])[1],
    lineNumber: (line.split(':').slice(-2, -1) || [])[0],
    columnNumber: (line.split(':').slice(-1)[0].match(/\d+/) || [])[0],
  })).filter(frame => frame.path);
};

const overrideWindowConsole = () => {
  const verbs = ['log', 'warn', 'error', 'info'];
  verbs.forEach((verb) => {
    window.console[verb] = (...args) => {
      const isError = args.length === 1 && args[0] instanceof Error;
      const stackPreFtwelve = (Error().stack || '').split('\n').splice(2).join('\n');
      const stack = parseStack(isError ? args[0].stack : stackPreFtwelve);
      output.append({ verb, args, stack });
      return originalConsole[verb] && originalConsole[verb].apply(window.console, args);
    };
  });
};

const restoreWindowConsole = () => {
  window.console = Object.assign({}, originalConsole);
};

const overrideWindowOnError = () => {
  window.onerror = (message, source, lineNo, colNo, error) => {
    if (originalOnError && typeof originalOnError === 'function') {
      originalOnError.call(this, message, source, lineNo, colNo, error);
    }
    console.error(error);
    return true;
  };
};

const restoreWindowOnError = () => {
  window.onerror = originalOnError ? originalOnError.bind({}) : null;
};

const exec = (command) => {
  setHistory(command);
  console.log(command);
  try {
    console.log(parseCommand(command));
  } catch (e) {
    console.error(e);
  }
};

const parseCommand = (command) => {
  command = command.trim();
  if ((command.startsWith('"') && command.endsWith('"')) ||
    (command.startsWith("'") && command.endsWith("'"))) {
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

const execHistory = getHistory();
const output = new Output();
const prompt = new Prompt();

export {
  exec,
  getHistory,
  overrideWindowConsole,
  overrideWindowOnError,
  parseCommand,
  parseStack,
  prompt,
  output,
  restoreWindowConsole,
  restoreWindowOnError,
  setHistory,
};

export default () => {
  return (
    <div className={styles.content}>
      {output.render()}
      {prompt.render()}
    </div>
  );
};
