import { h } from 'preact';
import assert from 'assert';
import { render } from '@testing-library/preact';
import ResponseStatus from './ResponseStatus';

describe('ResponseStatus', function() {
  it('should handle successful response', function() {
    const { container } = render(<ResponseStatus code={200}/>);
    assert(container.textContent === '200');
    assert(container.childNodes[0].classList.contains('success'));
  });
  it('should handle error response', function() {
    const { container } = render(<ResponseStatus code={400}/>);
    assert(container.textContent === '400');
    assert(container.childNodes[0].classList.contains('error'));
  });
  it('should handle pending response', function() {
    const { container } = render(<ResponseStatus code={undefined}/>);
    assert(container.textContent === '...');
  });
  it('should handle failed request', function() {
    const { container } = render(<ResponseStatus code={-1}/>);
    assert(container.textContent === '⚠');
    assert(container.childNodes[0].classList.contains('error'));
  });
});
