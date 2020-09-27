import jsx from '../../../utilities/jsx';
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
  let output;

  consoleHook.onConsole((...args) => output.append(...args));

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

  return {
    exec,
    getHistory,
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
