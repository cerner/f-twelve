import styles from 'src/css/views/console.css';
const prune = require('json-prune');

/**
 * Console tab output
 */
class Output {
  constructor() {
    this.el = document.createElement('div');
  }

  render() {
    this.el.className = styles.output;
    return this.el;
  }

  append({ verb = 'log', args }) {
    const newEntry = document.createElement('div');
    newEntry.className = `${styles.row} ${styles[verb]}`;

    // Add timestamp
    const timestamp = document.createElement('span');
    const tzOffset = (new Date()).getTimezoneOffset() * 60000;
    timestamp.className = styles.timestamp;
    timestamp.textContent = (new Date(Date.now() - tzOffset)).toISOString().slice(11, 23);
    newEntry.appendChild(timestamp);

    Object.keys(args).forEach((key) => {
      const arg = args[key];

      // Output text
      const outputText = document.createElement('span');
      outputText.className = styles.outputText;
      if (typeof arg === 'object') {
        outputText.innerHTML = arg.constructor && arg.constructor.name && arg.constructor.name.indexOf('Error') > -1
          ? arg.stack : JSON.stringify(JSON.parse(prune(arg, Output.pruneOptions)), null, 2);
      } else {
        outputText.innerHTML = arg;
      }

      // Expand icon
      if (outputText.textContent.indexOf('\n') > -1) {
        outputText.classList.add(styles.block);
        outputText.onclick = Output.onClickExpandIcon.bind(this, outputText);
      }

      newEntry.appendChild(outputText);
    });

    this.el.appendChild(newEntry);
    if (newEntry.scrollIntoView) {
      newEntry.scrollIntoView();
    }
  }

  static onClickExpandIcon(outputEntry) {
    if (outputEntry.classList.contains(styles.open)) {
      outputEntry.classList.remove(styles.open);
    } else {
      outputEntry.classList.add(styles.open);
    }
  }
}

Output.pruneOptions = {
  depthDecr: 10,
  replacer: function(value, defaultValue, circular) {
    if (circular) return `"-circular-"`;
    if (value === undefined) return `"-undefined-"`;
    if (Array.isArray(value)) return `"-array(` + value.length + `)-"`;
    return defaultValue;
  }
};

export default Output;
