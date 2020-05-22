import jsx from '../utilities/jsx';
import Tab from './Tab';

/**
 * Tab bar with content
 */
export default ({ console, setContent }) => {
  return (
    <>
      <Tab label='Console' onclick={() => setContent(console)}/>
    </>
  );
};
