import { createRef, h } from 'preact';
import styles from './App.module.scss';
import Icon from './Icon';
import Console from './tabs/console/Console';
import Network from './tabs/network/Network';

const defaultHeight = 350;

/**
 * Root app view
 */
export default ({ id }) => {

  let height = defaultHeight;

  // DOM refs
  const appRef = createRef();
  const consoleRef = createRef();
  const networkRef = createRef();
  const contentWrapperRef = createRef();
  let content;

  // Populate the main content area when changing tabs
  const setContent = (ref) => {
    const el = ref.current.base;
    if (!content) {
      contentWrapperRef.current.appendChild(el);
    } else if (!el.isSameNode(content)) {
      contentWrapperRef.current.replaceChild(el, content);
    }
    content = el;
  };

  const toggleOpen = (e) => {
    const app = appRef.current;
    if (app.classList.contains(styles.open)) {
      app.classList.remove(styles.open);
      app.style.height = '0px';
    } else {
      app.classList.add(styles.open);
      app.style.height = `${height}px`;
    }
  };

  const resizeMouseDown = (event) => {
    window.addEventListener('mousemove', resizeMouseMove, false);
    window.addEventListener('mouseup', resizeMouseUp, false);
  };

  const resizeMouseMove = (event) => {
    height = Math.min(window.innerHeight, window.innerHeight - event.clientY);
    app.style.height = `${height}px`;
    if (height < 20) {
      toggleOpen();
      resizeMouseUp();
      height = defaultHeight;
    }
  };

  const resizeMouseUp = (event) => {
    window.removeEventListener('mousemove', resizeMouseMove, false);
    window.removeEventListener('mouseup', resizeMouseUp, false);
  };

  // TODO: access to console, network
  return (
    <div className={styles.fTwelve} id={id} ref={appRef}>
      <div className={styles.resizer} onMouseDown={resizeMouseDown}/>
      <Icon className={styles.icon} onclick={toggleOpen} title="F-Twelve"/>
      <div className={styles.tabBar}>
        <div className={styles.tab} onClick={() => setContent(consoleRef)}>Console</div>
        <div className={styles.tab} onClick={() => setContent(networkRef)}>Network</div>
      </div>
      <div className={styles.content} ref={contentWrapperRef}>
        <Console ref={consoleRef}/>
        <Network ref={networkRef}/>
      </div>
    </div>
  );
};
