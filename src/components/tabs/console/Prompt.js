import { h } from 'preact';
import styles from './Prompt.module.scss';
import { exec, getHistory } from '../../../utilities/consoleCommands';

/**
 * Console tab input
 */
export default ({ inputRef } = {}) => {
  let historyPos = -1;
  let currentInput = '';
  let inputEl;

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && inputEl.value) {
      executeCommand(inputEl.value);
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      retrieveHistory();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      retrieveHistory(true);
    }
  };

  const onChange = (_) => {
    historyPos = -1;
    currentInput = inputEl.value;
  };

  const executeCommand = (command) => {
    exec(command);
    historyPos = -1;
    currentInput = '';
    inputEl.value = '';
  };

  const retrieveHistory = (reverse = false) => {
    const history = getHistory();
    if (reverse) {
      historyPos = Math.max(--historyPos, -1);
    } else {
      historyPos = Math.min(++historyPos, history.length - 1);
    }
    inputEl.value = historyPos === -1 ? currentInput : history[historyPos] || '';
  };

  const Prompt = (
    <div className={styles.prompt}>
      <div className={styles.promptChar}>&#8250;</div>
      <input className={styles.promptInput}
             onChange={onChange}
             onInput={onChange}
             onKeyDown={onKeyDown}
             onPaste={onChange}
             ref={el => (inputEl = el)}
      />
    </div>
  );
  // Provide a ref to the input box
  if (typeof inputRef === 'function') inputRef(inputEl);
  return Prompt;
};
