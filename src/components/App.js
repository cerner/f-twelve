import { createRef, h, Fragment } from 'preact';
import styles from './App.module.scss';
import Icon from './Icon';
import Console, { prepConsoleData } from './tabs/console/Console';
import Network, { networkReducer } from './tabs/network/Network';
import { useReducer, useState } from 'preact/hooks';
import consoleHook from '../utilities/hooks/consoleHook';
import xhrHook from '../utilities/hooks/xhrHook';

const defaultHeight = 350;

/**
 * Root app view
 */
export default ({ id }) => {
  const ref = createRef();
  const [isOpen, setOpen] = useState(false);
  const [height, setHeight] = useState(defaultHeight);
  const [activeTab, setActiveTab] = useState('console');
  const [consoleData, addConsoleData] = useReducer((rows, row) => rows.concat(prepConsoleData(row)), []);
  const [networkData, dispatchNetworkData] = useReducer(networkReducer, []);

  // Every time console.log (or similar) is called, store the data
  consoleHook.onConsole(addConsoleData);

  // Every time an XHR readystatechange event occurs, store the data
  xhrHook.onOpened((xhr) => dispatchNetworkData([XMLHttpRequest.OPENED, xhr]));
  xhrHook.onHeadersReceived((xhr) => dispatchNetworkData([XMLHttpRequest.HEADERS_RECEIVED, xhr]));
  xhrHook.onLoading((xhr) => dispatchNetworkData([XMLHttpRequest.LOADING, xhr]));
  xhrHook.onDone((xhr) => dispatchNetworkData([XMLHttpRequest.DONE, xhr]));

  const tabContents = {
    console: <Console consoleData={consoleData}/>,
    network: <Network networkData={networkData}/>
  };

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
    setHeight(parseFloat(ref.current.style.height) || defaultHeight);
  };

  const onClickTab = (event) => setActiveTab(event.target.textContent.toLowerCase());
  const getTabClassName = (tabName) => `${styles.tab} ${activeTab === tabName ? styles.activeTab : ''}`.trim();

  const icon = <Icon className={styles.icon} onClick={toggleOpen} title={`${isOpen ? 'Hide' : 'Show'} F-Twelve`}/>;

  return (
    <div className={`${styles.fTwelve} ${isOpen ? styles.open : ''}`} id={id} ref={ref}>
      {!isOpen ? icon : (
        <Fragment>
          <div className={styles.resizer} onMouseDown={resizeMouseDown}/>
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
