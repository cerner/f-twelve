import jsx from '../utilities/jsx';
import styles from './App.module.css';
import Tabs from './Tabs';
import Console from './content/console/Console';

/**
 * Root app view
 */
export default ({ id }) => {
  let contentWrapper;
  let content;
  const console = Console();

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

  return {
    console,
    el: (
      <div className={styles.fTwelve} id={id}>
        <Tabs console={console.el} setContent={setContent}/>
        <div ref={el => (contentWrapper = el)}/>
      </div>
    )
  };
};
