import { createRef, h } from 'preact';
import { useEffect } from 'preact/hooks';
import styles from './Console.module.scss';
import Prompt from './Prompt';
import CopyButton from '../../CopyButton';
import getTimestamp from '../../../utilities/getTimestamp';
import Tree, { getNode } from '../../dataTree/Tree';

/**
 * The content and logic for the Console tab
 */
export default ({ consoleData }) => {
  // Scroll to the bottom on render
  const outputRef = createRef();
  useEffect(() => (outputRef.current.scrollTop = outputRef.current.scrollHeight));

  return (
    <div className={styles.console}>
      <div className={styles.output} ref={outputRef}>
        {consoleData.map(row => (
          <div className={`${styles.row} ${styles[row.level]}`}>
            <div className={styles.timestamp}>{row.timestamp.split(' ')[1]}</div>
            <div className={styles.consoleArgs}>{
              row.argData.map(dataTree => <Tree dataTree={dataTree}/>)
            }</div>
            <div className={styles.fileName}>
              <CopyButton getText={() => row.stackString} title='Copy stack'/>
              <span title={row.stackString}>{row.fileName}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.copyAllButton}>
        <CopyButton getText={() => toJson(consoleData)} title="Copy all output"/>
      </div>
      <Prompt exec={exec} getHistory={getHistory}/>
    </div>
  );
};

/**
 * Add additional info to the console args provided by the consoleHook
 */
export const prepConsoleData = ({ level = 'log', args, stack = [] }) => {
  const timestamp = getTimestamp();

  const frame = (stack && stack[0]) || {};
  const fileName = frame.fileName && frame.lineNumber
    ? `${frame.fileName}:${frame.lineNumber}`
    : frame.fileName || '';

  const argData = Object.keys(args).map((key) => {
    const arg = args[key];
    const isError = arg instanceof Error ||
      (arg && arg.constructor && arg.constructor.name && arg.constructor.name.indexOf('Error') > -1);
    return getNode(isError ? (arg.stack || arg) : arg);
  });

  return {
    argData,
    fileName,
    level,
    stack,
    stackString: stack.map(frame => frame.path).join('\n'),
    timestamp,
  };
};

/**
 * Generate a json representation of the console data
 */
export const toJson = (consoleData) => JSON.stringify({
  userAgent: navigator.userAgent,
  href: window.location.href,
  time: getTimestamp(),
  consoleOutput: consoleData.map(row => {
    const argData = row.argData.map(dataTree => JSON.parse(dataTree.toJson()));
    return {
      time: row.timestamp,
      stack: row.stack,
      output: argData
    };
  })
});

/**
 * Local storage key for command history
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
