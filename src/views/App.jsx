import jsx from '../utilities/jsx';
import styles from './App.module.css';
import Tabs from './Tabs';

/**
 * Root app view
 */

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

export default ({ id }) => (
  <div className={styles.fTwelve} id={id}>
    <Tabs setContent={setContent}/>
    <div ref={el => (contentWrapper = el)}/>
  </div>
);
