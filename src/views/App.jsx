// import dom from '../utilities/dom'; // eslint-disable-line no-unused-vars
import styles from './App.module.css';
import Tabs from './tabs';
import Console from './content/console/console';

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

console.warn('wottttt');

export default () => {
  return (
    <div id='f-twelve' className={styles.fTwelve}>
      {new Tabs({ console, setContent }).render()}
      {contentWrapper}
    </div>
  );
};
