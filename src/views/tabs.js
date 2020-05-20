import jsx from '../utilities/jsx';
import Tab from './Tab';
import Console from './content/console/Console';

/**
 * Tab bar with content
 */
export default ({ setContent }) => {
  const console = <Console/>;
  return (
    <>
      <Tab
        label='Console'
        onclick={() => setContent(console)}
      />
    </>
  );
};
