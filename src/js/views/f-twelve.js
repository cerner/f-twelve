import styles from 'src/css/f-twelve.css';
import Tabs from './tabs';

/**
 * F-Twelve entrypoint
 */
class FTwelve {
  constructor() {
    this.el = document.createElement('div');
    this.onAttach = undefined;
    this.onDetach = undefined;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.enable(false);
    this.render();
  }

  render() {
    this.el.id = 'f-twelve';
    this.el.className = styles.fTwelve;
    this.contentWrapper = document.createElement('div');
    this.el.appendChild(new Tabs({ setContent: this.setContent.bind(this) }).render());
    this.el.appendChild(this.contentWrapper);
    return this.el;
  }

  setContent(el) {
    if (this.content) {
      this.contentWrapper.removeChild(this.content);
    }
    if (!el.isSameNode(this.content)) {
      this.contentWrapper.appendChild(el);
      this.content = el;
    } else {
      this.content = undefined;
    }
  }

  enable(show = true) {
    this.active = true;
    if (show) {
      this.attach();
    }
    this.enableKeyboardTrigger();
  }

  disable() {
    this.active = false;
    this.detach();
    this.disableKeyboardTrigger();
  }

  attach() {
    if (this.attached === true || this.active !== true) {
      return;
    }
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(this.el);
    this.attached = true;
    if (typeof this.onAttach === 'function') {
      this.onAttach();
    }
  }

  detach() {
    if (this.attached !== true) {
      return;
    }
    const el = document.getElementById(this.el.id);
    el.parentNode.removeChild(el);
    this.attached = false;
    if (typeof this.onDetach === 'function') {
      this.onDetach();
    }
  }

  onKeyDown(event) {
    this.keyDownStack += event.key;
    if (event.key === 'F12' || this.keyDownStack.toUpperCase() !== 'F12') {
      return;
    }
    if (this.attached) {
      this.detach();
    } else {
      this.attach();
    }
  }

  onKeyUp() {
    this.keyDownStack = '';
  }

  enableKeyboardTrigger() {
    this.keyDownStack = '';
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  disableKeyboardTrigger() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }
}

export default FTwelve;
