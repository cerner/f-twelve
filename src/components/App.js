import jsx from '../utilities/jsx';
import styles from './App.module.scss';
import Console from './tabs/console/Console';

/**
 * Root app view
 */
export default ({ id }) => {
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

  const console = Console();

  return {
    console,
    el: (
      <div className={styles.fTwelve} id={id}>
        <div className={styles.tabBar}>
          <div className={styles.tab} onclick={() => setContent(console.el)}>Console</div>
        </div>
        <div ref={el => (contentWrapper = el)}/>
      </div>
    )
  };
};
