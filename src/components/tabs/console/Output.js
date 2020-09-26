import jsx from '../../../utilities/jsx';
import styles from './Output.module.scss';
import Tree from '../../dataTree/Tree';
import getTimestamp from '../../../utilities/getTimestamp';
import CopyButton from '../../CopyButton';

const outputData = [];

/**
 * Console tab output
 */
export default () => {
  const el = <div className={styles.output}/>;

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
      return <Tree data={isError ? (arg.stack || arg) : arg} ref={ref => treeData.push(ref.dataTree)}/>;
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
    el.appendChild(row);
    if (row.scrollIntoView) {
      row.scrollIntoView();
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

  return {
    append,
    toJson,
    el
  };
};
