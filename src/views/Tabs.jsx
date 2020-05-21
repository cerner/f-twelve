import jsx from '../utilities/jsx';
import Tab from './Tab';
import Console from './content/console/Console';

/**
 * Tab bar with content
 */
const console = <Console/>;
export default ({ setContent }) => {
  return (
    <>
      <Tab
        label='Console'
        onclick={() => setContent(console)}
      />
    </>
  );
};
