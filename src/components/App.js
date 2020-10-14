import { createRef, h } from 'preact';
import styles from './App.module.scss';
import Icon from './Icon';
import Console from './tabs/console/Console';
import Network from './tabs/network/Network';
import { useState } from 'preact/hooks';

const defaultHeight = 350;

const tabContents = {
  console: <Console/>,
  network: <Network/>
};

/**
 * Root app view
 */
export default ({ id }) => {
  const ref = createRef();
  const [isOpen, setOpen] = useState(false);
  const [height, setHeight] = useState(defaultHeight);
  const [activeTab, setActiveTab] = useState('console');

  const toggleOpen = () => {
    ref.current && (ref.current.style.height = isOpen ? '0px' : `${height}px`);
    setOpen(!isOpen);
  };

  const resizeMouseDown = (event) => {
    window.addEventListener('mousemove', resizeMouseMove, false);
    window.addEventListener('mouseup', resizeMouseUp, false);
  };

  const resizeMouseMove = (event) => {
    const height = Math.min(window.innerHeight, window.innerHeight - event.clientY);
    ref.current && (ref.current.style.height = `${height}px`);
    if (height < 20) {
      toggleOpen();
      resizeMouseUp();
      setHeight(defaultHeight);
    }
  };

  const resizeMouseUp = (event) => {
    window.removeEventListener('mousemove', resizeMouseMove, false);
    window.removeEventListener('mouseup', resizeMouseUp, false);
  };

  const onClickTab = (event) => setActiveTab(event.target.textContent.toLowerCase());

  return (
    <div className={`${styles.fTwelve} ${isOpen ? styles.open : ''}`} id={id} ref={ref}>
      <div className={styles.resizer} onMouseDown={resizeMouseDown}/>
      <Icon className={styles.icon} onClick={toggleOpen} title={`${isOpen ? 'Hide' : 'Show'} F-Twelve`}/>
      <div className={styles.tabBar}>
        <div className={styles.tab} onClick={onClickTab}>Console</div>
        <div className={styles.tab} onClick={onClickTab}>Network</div>
      </div>
      <div className={styles.content}>
        {tabContents[activeTab]}
      </div>
    </div>
  );
};
