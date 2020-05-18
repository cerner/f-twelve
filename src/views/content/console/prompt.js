import styles from './console.css';

/**
 * Console tab input
 */
class Prompt {
  constructor({ console }) {
    this.el = document.createElement('div');
    this.console = console;
    this.historyPos = -1;
    this.currentInput = '';
  }

  render() {
    const promptChar = document.createElement('div');
    promptChar.className = styles.promptChar;
    promptChar.innerHTML = '&#8250;';
    this.el.appendChild(promptChar);

    this.promptInput = document.createElement('input');
    this.promptInput.className = styles.promptInput;
    this.promptInput.onkeydown = this.onKeyDown.bind(this);
    this.promptInput.onchange = this.onChange.bind(this);
    this.promptInput.onpaste = this.onChange.bind(this);
    this.promptInput.oninput = this.onChange.bind(this);
    this.el.appendChild(this.promptInput);
    this.el.className = styles.prompt;
    return this.el;
  }

  onKeyDown(event) {
    if (event.key === 'Enter' && this.promptInput.value) {
      this.executeCommand(this.promptInput.value);
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      this.retrieveHistory();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      this.retrieveHistory(true);
    }
  }

  onChange() {
    this.historyPos = -1;
    this.currentInput = this.promptInput.value;
  }

  executeCommand(command) {
    this.console.exec(command);
    this.historyPos = -1;
    this.currentInput = '';
    this.promptInput.value = '';
  }

  retrieveHistory(reverse = false) {
    const history = this.console.getHistory();
    if (reverse) {
      this.historyPos = Math.max(--this.historyPos, -1);
    } else {
      this.historyPos = Math.min(++this.historyPos, history.length - 1);
    }
    this.promptInput.value = this.historyPos === -1 ? this.currentInput : history[this.historyPos] || '';
  }
}

export default Prompt;
