import { createRef, h, Fragment } from 'preact';
import styles from './App.module.scss';
import Icon from './Icon';
import Console from './tabs/console/Console';
import Network from './tabs/network/Network';
import { useState } from 'preact/hooks';
import useConsoleData from './useConsoleData';
import useNetworkData from './useNetworkData';
import useResizer from './useResizer';

/**
 * Root app view
 */
export default () => {
  const ref = createRef();
  const [isOpen, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('console');
  const consoleData = useConsoleData();
  const networkData = useNetworkData();
  const [resizer, height] = useResizer({ defaultSize: 350, targetRef: ref });

  const tabContents = {
    console: <Console consoleData={consoleData}/>,
    network: <Network networkData={networkData}/>
  };

  const toggleOpen = () => {
    ref.current && (ref.current.style.height = isOpen ? '0px' : `${height}px`);
    setOpen(!isOpen);
  };

  const onClickTab = (event) => setActiveTab(event.target.textContent.toLowerCase());
  const getTabClassName = (tabName) => `${styles.tab} ${activeTab === tabName ? styles.activeTab : ''}`.trim();

  const icon = <Icon className={styles.icon} onClick={toggleOpen} title={`${isOpen ? 'Hide' : 'Show'} F-Twelve`}/>;

  return (
    <div className={`${styles.app} ${isOpen ? styles.open : ''}`} ref={ref}>
      {!isOpen ? icon : (
        <Fragment>
          {resizer}
          {icon}
          <div className={styles.tabBar}>
            <div className={getTabClassName('console')} onClick={onClickTab}>Console</div>
            <div className={getTabClassName('network')} onClick={onClickTab}>Network</div>
          </div>
          <div className={styles.content}>
            {tabContents[activeTab]}
          </div>
        </Fragment>
      )}
    </div>
  );
};
