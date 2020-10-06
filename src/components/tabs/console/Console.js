import { createRef, h } from 'preact';
import styles from './Console.module.scss';
import Output from './Output';
import Prompt from './Prompt';
import parseCommand from '../../../utilities/parseCommand';
import CopyButton from '../../CopyButton';
import consoleHook from '../../../utilities/hooks/consoleHook';

/**
 * The content of the Console tab
 */
const historyKey = 'fTwelve.history';
export default () => {

  const outputRef = createRef();

  let append;
  let toJson;
  consoleHook.onConsole((...args) => append(...args));

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

  // TODO: access to exec, getHistory, setHistory
  return (
    <div className={styles.console}>
      <Output appendRef={ref => append = ref} toJsonRef={ref => toJson = ref} ref={outputRef}/>
      <div className={styles.copyAllButton}>
        <CopyButton getText={() => toJson()} title="Copy all output"/>
      </div>
      <Prompt exec={exec} getHistory={getHistory}/>
    </div>
  );
};
