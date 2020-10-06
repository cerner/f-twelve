import { h, createRef, render } from 'preact';
import styles from './Output.module.scss';
import Tree, { getNode } from '../../dataTree/Tree';
import getTimestamp from '../../../utilities/getTimestamp';
import CopyButton from '../../CopyButton';

const outputData = [];

/**
 * Console tab output
 */
// TODO: These ref functions
export default ({ appendRef, toJsonRef }) => {
  const ref = createRef();

  const append = ({ level = 'log', args, stack = [] }) => {
    const timestamp = getTimestamp();

    const frame = (stack && stack[0]) || {};
    const fileName = frame.fileName && frame.lineNumber
      ? `${frame.fileName}:${frame.lineNumber}`
      : frame.fileName || '';

    const treeData = [];
    const argElements = Object.keys(args).map((key) => {
      const arg = args[key];
      const isError = arg instanceof Error ||
        (arg && arg.constructor && arg.constructor.name && arg.constructor.name.indexOf('Error') > -1);
      const dataTree = getNode(isError ? (arg.stack || arg) : arg);
      treeData.push(dataTree);
      return <Tree dataTree={dataTree}/>;
    });

    const stackString = stack.map(frame => frame.path).join('\n');
    const row = (
      <div className={`${styles.row} ${styles[level]}`}>
        <div className={styles.timestamp}>{timestamp.split(' ')[1]}</div>
        <div className={styles.consoleArgs}>{[...argElements]}</div>
        <div className={styles.fileName}>
          <CopyButton getText={() => stackString} title='Copy stack'/>
          <span title={stackString}>{fileName}</span>
        </div>
      </div>
    );

    // Append do the DOM
    const el = document.createElement('div');
    ref.current.appendChild(el);
    render(row, el.parentNode, el);
    if (el.scrollIntoView) {
      el.scrollIntoView();
    }

    // Append to the data variable
    outputData.push({
      timestamp,
      stack,
      treeData,
    });
  };

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

  appendRef(append);
  toJsonRef(toJson);

  // TODO: access to append, toJson
  return <div className={styles.output} ref={ref}/>;
};
