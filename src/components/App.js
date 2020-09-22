import jsx from '../utilities/jsx';
import styles from './App.module.scss';
import Icon from './Icon';
import Console from './tabs/console/Console';

/**
 * Root app view
 */
export default ({ id }) => {
  let app;
  let contentWrapper;
  let content;

  const setContent = (el) => {
    contentWrapper.replaceChild(el, content);
    content = el;
  };

  const toggleOpen = () => {
    app.classList.contains(styles.open)
      ? app.classList.remove(styles.open)
      : app.classList.add(styles.open);

  };

  const console = Console();

  // Default content to be Console
  content = console.el;

  return {
    console,
    el: (
      <div className={styles.fTwelve} id={id} ref={el => (app = el)}>
        <Icon className={styles.icon} onclick={toggleOpen} title="Toggle F-Twelve"/>
        <div className={styles.tabBar}>
          <div className={styles.tab} onclick={() => setContent(console.el)}>Console</div>
          <div className={styles.tab} onclick={() => setContent(<div>Network tab</div>)}>Network</div>
        </div>
        <div className={styles.content} ref={el => (contentWrapper = el)}>{content}</div>
      </div>
    )
  };
};
