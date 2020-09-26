/* eslint-disable no-console */
import jsx from '../../../utilities/jsx';
import styles from './Console.module.scss';
import Output from './Output';
import Prompt from './Prompt';
import parseCommand from '../../../utilities/parseCommand';
import parseStack from '../../../utilities/parseStack';
import CopyButton from '../../CopyButton';

/**
 * The content of the Console tab
 */
const historyKey = 'fTwelve.history';
const originalConsole = Object.assign({}, window.console);
const originalOnError = window.onerror && typeof window.onerror === 'function' ? window.onerror.bind({}) : null;
export default () => {
  let output;

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

  const overrideWindowConsole = () => {
    const levels = ['log', 'warn', 'error', 'info'];
    levels.forEach((level) => {
      window.console[level] = (...args) => {
        const isError = args.length === 1 && args[0] instanceof Error;
        const stackPreFtwelve = getStack().split('\n').splice(3).join('\n');
        const stack = parseStack(isError ? args[0].stack : stackPreFtwelve);
        output.append({ level: level, args, stack });
        return originalConsole[level] && originalConsole[level].apply(window.console, args);
      };
    });
  };

  /**
   * Only way to get a stack in IE is throw an actual error!
   */
  const getStack = () => {
    try {
      throw Error();
    } catch (error) {
      return error.stack || '';
    }
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

  const execHistory = getHistory();

  return {
    exec,
    getHistory,
    overrideWindowConsole,
    overrideWindowOnError,
    restoreWindowConsole,
    restoreWindowOnError,
    setHistory,
    el: (
      <div className={styles.console}>
        <Output ref={ref => (output = ref)}/>
        <div className={styles.copyAllButton}>
          <CopyButton getText={output.toJson} title="Copy all output"/>
        </div>
        <Prompt exec={exec} getHistory={getHistory}/>
      </div>
    )
  };
};
