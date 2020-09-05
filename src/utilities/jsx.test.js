import jsx from './jsx';
import assert from 'assert';

describe('#jsx()', function() {
  describe('dom elements', function() {
    it('should handle simple elements without props', function() {
      const el = <div/>;
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.strictEqual(el.childNodes.length, 0);
      assert.strictEqual(el.attributes.length, 0);
    });
    it('should handle simple elements with props', function() {
      const el = <div id="test"/>;
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.strictEqual(el.childNodes.length, 0);
      assert.strictEqual(el.attributes.length, 1);
      assert.strictEqual(el.getAttribute('id'), 'test');
    });
    it('should handle simple elements with text content', function() {
      const el = <div>text</div>;
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.strictEqual(el.childNodes.length, 1);
      assert.strictEqual(el.attributes.length, 0);
      const textNode = el.childNodes[0];
      assert.strictEqual(textNode.constructor.name, 'Text');
      assert.strictEqual(textNode.textContent, 'text');
    });
    it('should handle simple elements with number content', function() {
      const el = <div>{3}</div>;
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.strictEqual(el.childNodes.length, 1);
      assert.strictEqual(el.attributes.length, 0);
      const textNode = el.childNodes[0];
      assert.strictEqual(textNode.constructor.name, 'Text');
      assert.strictEqual(textNode.textContent, '3');
    });
    it('should handle simple elements with boolean content (false)', function() {
      const el = <div>{false}</div>;
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.strictEqual(el.childNodes.length, 0);
      assert.strictEqual(el.attributes.length, 0);
    });
    it('should handle simple elements with boolean content (true)', function() {
      const el = <div>{true}</div>;
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.strictEqual(el.childNodes.length, 0);
      assert.strictEqual(el.attributes.length, 0);
    });
    it('should handle simple elements with null content', function() {
      const el = <div>{null}</div>;
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.strictEqual(el.childNodes.length, 0);
      assert.strictEqual(el.attributes.length, 0);
    });
    it('should handle simple elements with function content', function() {
      const el = <div>{() => 'test'}</div>;
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.strictEqual(el.childNodes.length, 0);
      assert.strictEqual(el.attributes.length, 0);
    });
    it('should handle simple element fragments', function() {
      const els = (
        <>
          <div id="div1"/>
          <div id="div2"/>
        </>
      );
      assert.strictEqual(els instanceof Array, true);
      assert.strictEqual(els[0].id, 'div1');
      assert.strictEqual(els[1].id, 'div2');
    });
    it('should handle simple element with child nodes', function() {
      const el = (
        <div>
          <span id="span"/>
        </div>
      );
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.strictEqual(el.childNodes.length, 1);
      assert.strictEqual(el.attributes.length, 0);
      const span = el.childNodes[0];
      assert.strictEqual(span instanceof HTMLSpanElement, true);
      assert.strictEqual(span.childNodes.length, 0);
      assert.strictEqual(span.attributes.length, 1);
    });
  });

  describe('custom components', function() {
    before(function() {
      this.Component = ({ attr, children }) => (
        <div id={attr}>{[...children]}</div>
      );
      this.ObjComponent = ({ attr, children = [] } = {}) => ({
        key: 'value',
        el: <div id={attr}>{[...children]}</div>
      });
    });
    it('should handle custom components without props', function() {
      const el = <this.Component/>;
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.strictEqual(el.childNodes.length, 0);
      assert.strictEqual(el.attributes.length, 1);
    });
    it('should handle custom components with props', function() {
      const el = <this.Component attr={'idAttr'}/>;
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.strictEqual(el.childNodes.length, 0);
      assert.strictEqual(el.attributes.length, 1);
      assert.strictEqual(el.getAttribute('id'), 'idAttr');
    });
    it('should handle custom components with text content', function() {
      const el = (
        <this.Component attr={'idAttr'}>
          I am text
        </this.Component>
      );
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.strictEqual(el.childNodes.length, 1);
      assert.strictEqual(el.attributes.length, 1);
      const textNode = el.childNodes[0];
      assert.strictEqual(textNode.constructor.name, 'Text');
      assert.strictEqual(textNode.textContent, 'I am text');
    });
    it('should handle custom component fragments', function() {
      const els = (
        <>
          <this.Component attr={'comp1'}/>
          <this.Component attr={'comp2'}/>
        </>
      );
      assert.strictEqual(els instanceof Array, true);
      assert.strictEqual(els[0].id, 'comp1');
      assert.strictEqual(els[1].id, 'comp2');
    });
    it('should handle custom component with child nodes', function() {
      const el = (
        <this.Component attr={'idAttr'}>
          <span id="span"/>
        </this.Component>
      );
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.strictEqual(el.childNodes.length, 1);
      assert.strictEqual(el.attributes.length, 1);
      const span = el.childNodes[0];
      assert.strictEqual(span instanceof HTMLSpanElement, true);
      assert.strictEqual(span.childNodes.length, 0);
      assert.strictEqual(span.attributes.length, 1);
    });
    it('should be accessible via ref prop', function() {
      let refEl;
      const el = <this.Component ref={ref => (refEl = ref)}/>;
      assert.deepStrictEqual(el, refEl);
    });
    it('should support custom components that return an object', function() {
      const component = this.ObjComponent();
      const el = <this.ObjComponent/>;
      assert.strictEqual(component instanceof Object, true);
      assert.strictEqual(component.key, 'value');
      assert.strictEqual(el instanceof HTMLDivElement, true);
      assert.deepStrictEqual(el, component.el);
    });
  });
});
