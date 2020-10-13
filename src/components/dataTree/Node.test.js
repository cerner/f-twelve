import { h } from 'preact';
import { getNode } from './Tree';
import Node from './Node';
import assert from 'assert';

describe('Node', function() {
  it('should render simple values', function() {
    const node = <Node node={getNode('simple')}/>;
    assert.strictEqual(node.textContent, 'simple');
  });
  it('should render objects', function() {
    const node = <Node node={getNode({ objectKey: 'complex' })}/>;
    assert.strictEqual(node.textContent, 'Object(1)');
  });
  it('should render arrays', function() {
    const node = <Node node={getNode([1, 2, 3])}/>;
    assert.strictEqual(node.textContent, 'Array(3)');
  });
  it('should display value when clicked', function() {
    // Requires a parent to click
    const node = (
      <div>
        <Node node={getNode({ key: 'value' })}/>
      </div>
    );
    assert.strictEqual(node.getElementsByClassName('value').length, 0, this.setupError);
    node.querySelector('.caretIcon').click();
    assert.strictEqual(node.getElementsByClassName('value').length, 1);
  });

  describe('#onClickExpandIcon()', function() {
    // TODO: !!!!!!!!!!!!!!!!!!
    it('should display children on click', function() {
      this.output.append({ args: [{ key: 'value' }] });
      const args = this.el.getElementsByClassName('consoleArgs');
      assert.strictEqual(args.length, 1, this.setupError);
      const arg = args[0];
      assert.strictEqual(arg.getElementsByClassName('child').length, 0);
      arg.getElementsByClassName('caret')[0].click();
      assert(arg.getElementsByClassName('child').length > 0);
    });
    it('should remove children on click', function() {
      this.output.append({ args: [{ key: 'value' }] });
      const args = this.el.getElementsByClassName('consoleArgs');
      assert.strictEqual(args.length, 1, this.setupError);
      const arg = args[0];
      assert(arg.getElementsByClassName('child').length === 0, this.setupError);
      arg.getElementsByClassName('caret')[0].click();
      assert(arg.getElementsByClassName('child').length > 0, this.setupError);
      arg.getElementsByClassName('caret')[0].click();
      assert(arg.getElementsByClassName('child').length === 0);
    });
  });

});
