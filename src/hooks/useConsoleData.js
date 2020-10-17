import consoleHook from '../utilities/consoleHook';
import { useEffect, useReducer } from 'preact/hooks';
import { prepConsoleData } from '../components/tabs/console/Console';

/**
 * Subscribe to the consoleHook and provide the latest prepped consoleHook data
 */
export default () => {
  const reducer = (rows, row) => rows.concat(prepConsoleData(row));
  const [consoleData, addConsoleData] = useReducer(reducer, []);

  useEffect(() => {
    // Every time console.log/info/warn/error is called, store the data
    consoleHook.onConsole(addConsoleData);
  }, []);

  return consoleData;
};
