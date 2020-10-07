import { h } from 'preact';
import styles from './Console.module.scss';
import Prompt from './Prompt';
import CopyButton from '../../CopyButton';
import consoleHook, { console } from '../../../utilities/hooks/consoleHook';
import { useCallback, useState } from 'preact/hooks';
import getTimestamp from '../../../utilities/getTimestamp';
import Tree, { getNode } from '../../dataTree/Tree';

/**
 * The content of the Console tab
 */
export default () => {

  // Store the data for every console call
  const [rows, setRows] = useState([]);

  // Send all console output calls here
  consoleHook.onConsole((...args) => addRow(...args));
  // consoleHook.onConsole(addRow); // TODO: Use this?

  /**
   * Add the data from the console call to our rows state var
   */
  const addRow = useCallback(({ level = 'log', args, stack = [] }) => {
    const timestamp = getTimestamp();

    const frame = (stack && stack[0]) || {};
    const fileName = frame.fileName && frame.lineNumber
      ? `${frame.fileName}:${frame.lineNumber}`
      : frame.fileName || '';

    // TODO: Make this part better (treeData vs <Tree>)
    const treeData = [];
    const argElements = Object.keys(args).map((key) => {
      const arg = args[key];
      const isError = arg instanceof Error ||
        (arg && arg.constructor && arg.constructor.name && arg.constructor.name.indexOf('Error') > -1);
      const dataTree = getNode(isError ? (arg.stack || arg) : arg);
      treeData.push(dataTree);
      return <Tree dataTree={dataTree}/>;
    });

    // Append do the DOM
    const el = {};
    if (el.scrollIntoView) {
      el.scrollIntoView();
    }

    console.log('Current rows:', rows);
    setRows([...rows, {
      argElements,
      fileName,
      level,
      stack,
      stackString: stack.map(frame => frame.path).join('\n'),
      timestamp,
      treeData,
    }]);
  }, [rows]);

  const toJson = () => JSON.stringify({
    userAgent: navigator.userAgent,
    href: window.location.href,
    time: getTimestamp(),
    consoleOutput: outputData.map(rowData => {
      const treeData = rowData.treeData.map(tree => JSON.parse(tree.toJson()));
      return {
        time: rowData.timestamp,
        stack: rowData.stack,
        output: treeData
      };
    })
  });

  return (
    <div className={styles.console}>
      <div className={styles.output}>
        {rows.map(row => (
          <div className={`${styles.row} ${styles[row.level]}`}>
            <div className={styles.timestamp}>{row.timestamp.split(' ')[1]}</div>
            <div className={styles.consoleArgs}>{[...row.argElements]}</div>
            <div className={styles.fileName}>
              <CopyButton getText={() => row.stackString} title='Copy stack'/>
              <span title={row.stackString}>{row.fileName}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.copyAllButton}>
        <CopyButton getText={() => test()} title="Copy all output"/>
      </div>
      <Prompt/>
    </div>
  );
};
