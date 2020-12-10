import { createRef, h } from 'preact';
import styles from './Prompt.module.scss';

/**
 * Console tab input
 */
export default ({ exec, getHistory } = {}) => {
  const inputEl = createRef();

  let historyPos = -1;
  let currentInput = '';

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && inputEl.current.value) {
      executeCommand(inputEl.current.value);
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      retrieveHistory();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      retrieveHistory(true);
    }
  };

  const onChange = (event) => {
    historyPos = -1;
    currentInput = inputEl.current.value;
  };

  const executeCommand = (command) => {
    exec(command);
    historyPos = -1;
    currentInput = '';
    inputEl.current.value = '';
  };

  const retrieveHistory = (reverse = false) => {
    const history = getHistory();
    if (reverse) {
      historyPos = Math.max(--historyPos, -1);
    } else {
      historyPos = Math.min(++historyPos, history.length - 1);
    }
    inputEl.current.value = historyPos === -1 ? currentInput : history[historyPos] || '';
  };

  return (
    <div className={styles.prompt}>
      <div className={styles.promptChar}>&#8250;</div>
      <input className={styles.promptInput}
             onChange={onChange}
             onInput={onChange}
             onKeyDown={onKeyDown}
             onPaste={onChange}
             ref={inputEl}
      />
    </div>
  );
};
