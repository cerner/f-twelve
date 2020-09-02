import jsx from '../../../utilities/jsx';
import styles from './Console.module.scss';
import DataTree from '../../dataTree/Node';

/**
 * Console tab output
 */
export default () => {
  const el = <div className={styles.output}/>;

  const append = ({ verb = 'log', args, stack = [] }) => {
    const tzOffset = (new Date()).getTimezoneOffset() * 60000;
    const timestamp = (new Date(Date.now() - tzOffset)).toISOString().slice(11, 23);

    const frame = (stack && stack[0]) || {};
    const fileName = frame.fileName && frame.lineNumber
      ? `${frame.fileName}:${frame.lineNumber}`
      : frame.fileName || '';

    const argElements = Object.keys(args).map((key) => {
      const arg = args[key];
      const isError = arg instanceof Error ||
        (arg && arg.constructor && arg.constructor.name && arg.constructor.name.indexOf('Error') > -1);
      return <DataTree data={isError ? (arg.stack || arg) : arg}/>;
    });

    const row = (
      <div className={`${styles.row} ${styles[verb]}`}>
        <div className={styles.timestamp}>{timestamp}</div>
        <div className={styles.consoleArgs}>{[...argElements]}</div>
        <a className={styles.fileName} href={frame.url} title={stack.map(frame => frame.path).join('\n')}>{fileName}</a>
      </div>
    );

    el.appendChild(row);
    if (row.scrollIntoView) {
      row.scrollIntoView();
    }
  };

  return {
    append,
    el
  };
};
