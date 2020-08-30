import jsx from '../../../utilities/jsx';
import styles from './Console.module.scss';
import DataTree from '../../DataTree';

/**
 * Console tab output
 *
 */
export default () => {
  const el = <div className={styles.output}/>;

  const append = ({ verb = 'log', args, stack = [] }) => {
    const newEntry = document.createElement('div');
    newEntry.className = `${styles.row} ${styles[verb]}`;

    // Add timestamp
    const timestamp = document.createElement('span');
    const tzOffset = (new Date()).getTimezoneOffset() * 60000;
    timestamp.className = styles.timestamp;
    timestamp.textContent = (new Date(Date.now() - tzOffset)).toISOString().slice(11, 23);
    newEntry.appendChild(timestamp);

    // Add file name
    const frame = (stack && stack[0]) || {};
    const fileName = document.createElement('a');
    fileName.className = styles.fileName;
    fileName.textContent = frame.fileName && frame.lineNumber
      ? `${frame.fileName}:${frame.lineNumber}`
      : frame.fileName || '';
    fileName.title = stack.map(frame => frame.path).join('\n');
    fileName.href = frame.url;
    newEntry.appendChild(fileName);

    Object.keys(args).forEach((key) => {
      const arg = args[key];

      // Output text
      const outputText = document.createElement('span');
      outputText.className = styles.outputText;
      if (typeof arg !== 'object') {
        outputText.innerHTML = arg;
      } else if (arg && arg.constructor && arg.constructor.name && arg.constructor.name.indexOf('Error') > -1) {
        outputText.innerHTML = arg.stack
      } else {
        outputText.appendChild(<DataTree data={args}/>);
      }

      // Expand icon
      if (outputText.textContent.indexOf('\n') > -1) {
        outputText.classList.add(styles.block);
        outputText.onclick = () => onClickExpandIcon(outputText);
      }

      newEntry.appendChild(outputText);
    });

    el.appendChild(newEntry);
    if (newEntry.scrollIntoView) {
      newEntry.scrollIntoView();
    }
  };

  return {
    append,
    el
  };
};

const onClickExpandIcon = (outputEntry) => {
  if (outputEntry.classList.contains(styles.open)) {
    outputEntry.classList.remove(styles.open);
  } else {
    outputEntry.classList.add(styles.open);
  }
};
