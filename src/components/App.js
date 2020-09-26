import jsx from '../utilities/jsx';
import styles from './App.module.scss';
import Icon from './Icon';
import Console from './tabs/console/Console';

/**
 * Root app view
 */
export default ({ id }) => {
  // DOM refs
  let app;
  let contentWrapper;
  let content;

  const setContent = (el) => {
    if (!el.isSameNode(content)) {
      contentWrapper.replaceChild(el, content);
      content = el;
    }
  };

  const toggleOpen = () => {
    app.classList.contains(styles.open)
      ? app.classList.remove(styles.open)
      : app.classList.add(styles.open);
  };

  const resizeMouseDown = (event) => {
    window.addEventListener('mousemove', resizeMouseMove, false);
    window.addEventListener('mouseup', resizeMouseUp, false);
  };

  const resizeMouseMove = (event) => {
    app.style.top = `${event.clientY}px`;
  };

  const resizeMouseUp = (event) => {
    window.removeEventListener('mousemove', resizeMouseMove, false);
    window.removeEventListener('mouseup', resizeMouseUp, false);
  };

  const console = Console();

  // Default content to be Console
  content = console.el;

  return {
    console,
    el: (
      <div className={styles.fTwelve} id={id} ref={el => (app = el)}>
        <div className={styles.resizer} onmousedown={resizeMouseDown}/>
        <Icon className={styles.icon} onclick={toggleOpen} title="F-Twelve"/>
        <div className={styles.tabBar}>
          <div className={styles.tab} onclick={() => setContent(console.el)}>Console</div>
          {/* <div className={styles.tab} onclick={() => setContent(<div>Network tab</div>)}>Network</div> */}
        </div>
        <div className={styles.content} ref={el => (contentWrapper = el)}>{content}</div>
      </div>
    )
  };
};
