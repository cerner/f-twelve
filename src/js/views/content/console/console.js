/* eslint-disable no-console */
import styles from 'src/css/f-twelve.css';
import Output from './output';
import Prompt from './prompt';

const historyKey = 'fTwelve.history';

/**
 * The content of the Console tab
 */
class Console {
  constructor() {
    this.el = document.createElement('div');
    this.execHistory = this.getHistory();
    this.output = new Output();
    this.prompt = new Prompt({ console: this });
    this.overrideWindowConsole();
    this.overrideWindowOnError();
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

  overrideWindowConsole() {
    const verbs = ['log', 'warn', 'error', 'info'];
    verbs.forEach((verb) => {
      const oldVerb = window.console[verb];
      window.console[verb] = (...args) => {
        this.output.append({ verb: verb, args: args });
        return oldVerb.apply(window.console, args);
      };
    });
  }

  overrideWindowOnError() {
    const oldOnError = window.onerror;
    window.onerror = (message, source, lineNo, colNo, error) => {
      if (oldOnError && typeof oldOnError === 'function') {
        oldOnError.call(this, message, source, lineNo, colNo, error);
      }
      console.error(error);
      return true;
    };
  }

  exec(command) {
    this.setHistory(command);
    console.log(command);
    try {
      console.log(this.evaluateObjectReference(command));
    } catch (e) {
      console.error(e);
    }
  }

  evaluateObjectReference(referenceString) {
    return referenceString.replace(/(?=\[)/g, '.').split('.').reduce((object, memberString) => {
      const bracketMatch = memberString.match(/^\[([^\]]*)]$/);
      const memberName = bracketMatch ? bracketMatch[1].replace(/^["']|["']$/g, '') : memberString;
      return (object || {})[memberName];
    }, window);
  }
}

export default Console;
