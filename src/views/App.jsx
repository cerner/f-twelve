import dom from '../utilities/dom'; // eslint-disable-line no-unused-vars
import styles from './App.module.css';
import Tabs from './tabs';
import Console from './content/console/console';

/**
 * Root app view
 */

const console = new Console();

let contentWrapper;
let content;

const setContent = (el) => {
  if (content) {
    contentWrapper.removeChild(content);
  }
  if (!el.isSameNode(content)) {
    contentWrapper.appendChild(el);
    content = el;
  } else {
    content = undefined;
  }
};

export {
  setContent,
  console
};

export default ({ id }) => (
  <div id={id} className={styles.fTwelve}>
    {new Tabs({ console, setContent }).render()}
    <div ref={node => (contentWrapper = node)}/>
  </div>
);
