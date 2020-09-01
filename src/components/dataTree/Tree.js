import jsx from '../../utilities/jsx';
import Node from './Node';

/**
 * JS data in the DOM as an interactive tree
 */
export default ({ data }) => {
  return (
    <Node data={data}/>
  );
};
