import { h } from 'preact';
import assert from 'assert';
import { render } from '@testing-library/preact';
import ResponseStatus from './ResponseStatus';

describe('ResponseStatus', function() {
  it('Should handle successful response', function() {
    const { container } = render(<ResponseStatus code={200}/>);
    assert(container.textContent === '200');
    assert(container.childNodes[0].classList.contains('success'));
  });
  it('Should handle error response', function() {
    const { container } = render(<ResponseStatus code={400}/>);
    assert(container.textContent === '400');
    assert(container.childNodes[0].classList.contains('error'));
  });
  it('Should handle pending response', function() {
    const { container } = render(<ResponseStatus code={undefined}/>);
    assert(container.textContent === '...');
  });
  it('Should handle failed request', function() {
    const { container } = render(<ResponseStatus code={-1}/>);
    assert(container.textContent === '⚠');
    assert(container.childNodes[0].classList.contains('error'));
  });
});
