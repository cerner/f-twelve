/* eslint-disable no-console */
import styles from '../../App.module.css';
import Output from './output';
import Prompt from './prompt';

const historyKey = 'fTwelve.history';

const originalConsole = Object.assign({}, window.console);
const originalOnError = window.onerror && typeof window.onerror === 'function' ? window.onerror.bind({}) : null;

/**
 * The content of the Console tab
 */
class Console {
  constructor() {
    this.el = document.createElement('div');
    this.execHistory = this.getHistory();
    this.output = new Output();
    this.prompt = new Prompt({ console: this });
  }

  render() {
    this.el.className = styles.content;
    this.el.appendChild(this.output.render());
    this.el.appendChild(this.prompt.render());
    return this.el;
  }

  getHistory() {
    return window.localStorage
      ? (JSON.parse(window.localStorage.getItem(historyKey)) || [])
      : this.execHistory || [];
  }

  setHistory(command) {
    this.execHistory.unshift(command);
    this.execHistory = this.execHistory.slice(0, 50);
    if (window.localStorage) {
      window.localStorage.setItem(historyKey, JSON.stringify(this.execHistory));
    }
  }

  parseStack(stack) {
    return stack.split('\n').map((line) => ({
      path: (line.match(/^( *at )(.*)/) || [])[2],
      url: (line.match(/(http:\/\/.*?):\d+:\d+/) || [])[1],
      fileName: (line.match(/.+[\\/(](.*?\.\w+)/) || [])[1],
      lineNumber: (line.split(':').slice(-2, -1) || [])[0],
      columnNumber: (line.split(':').slice(-1)[0].match(/\d+/) || [])[0],
    })).filter(frame => frame.path);
  }

  overrideWindowConsole() {
    const verbs = ['log', 'warn', 'error', 'info'];
    verbs.forEach((verb) => {
      window.console[verb] = (...args) => {
        const isError = args.length === 1 && args[0] instanceof Error;
        const stackPreFtwelve = (Error().stack || '').split('\n').splice(2).join('\n');
        const stack = this.parseStack(isError ? args[0].stack : stackPreFtwelve);
        this.output.append({ verb, args, stack });
        return originalConsole[verb] && originalConsole[verb].apply(window.console, args);
      };
    });
  }

  restoreWindowConsole() {
    window.console = Object.assign({}, originalConsole);
  }

  overrideWindowOnError() {
    window.onerror = (message, source, lineNo, colNo, error) => {
      if (originalOnError && typeof originalOnError === 'function') {
        originalOnError.call(this, message, source, lineNo, colNo, error);
      }
      console.error(error);
      return true;
    };
  }

  restoreWindowOnError() {
    window.onerror = originalOnError ? originalOnError.bind({}) : null;
  }

  exec(command) {
    this.setHistory(command);
    console.log(command);
    try {
      console.log(this.parseCommand(command));
    } catch (e) {
      console.error(e);
    }
  }

  parseCommand(command) {
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
        (object || {})[memberName] = this.parseCommand(expressions.join('='));
      }
      return (object || {})[memberName];
    }, window);
  }
}

export default Console;
