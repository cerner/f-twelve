import jsx from '../../../utilities/jsx';
import styles from './Output.module.scss';
import Tree from '../../dataTree/Tree';
import getTimestamp from '../../../utilities/getTimestamp';

const outputData = [];

/**
 * Console tab output
 */
export default () => {
  const el = <div className={styles.output}/>;

  const append = ({ verb = 'log', args, stack = [] }) => {
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

    const row = (
      <div className={`${styles.row} ${styles[verb]}`}>
        <div className={styles.timestamp}>{timestamp}</div>
        <div className={styles.consoleArgs}>{[...argElements]}</div>
        <a className={styles.fileName} href={frame.url} title={stack.map(frame => frame.path).join('\n')}>{fileName}</a>
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
      fileName,
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
        file: rowData.fileName,
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
