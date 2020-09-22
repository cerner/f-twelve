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

  const open = () => app.classList.add(styles.open);
  const close = () => app.classList.remove(styles.open);

  const console = Console();

  return {
    console,
    el: (
      <div className={styles.fTwelve} id={id} ref={el => (app = el)}>
        <Icon className={styles.closedIcon} onclick={open} title="Show F-Twelve"/>
        <div className={styles.main}>
          <div className={styles.tabBar}>
            <Icon className={styles.openIcon} onclick={close} title="Hide F-Twelve"/>
            <div className={styles.tab} onclick={() => setContent(console.el)}>Console</div>
          </div>
          <div ref={el => (contentWrapper = el)}/>
        </div>
      </div>
    )
  };
};
