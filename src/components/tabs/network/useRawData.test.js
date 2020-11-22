import { h } from 'preact';
import assert from 'assert';
import useRawData from './useRawData';
import { renderHook, act } from '@testing-library/preact-hooks';

describe('useRawData', function() {
  it('Should handle strings', function() {
    const { result } = renderHook(() => useRawData('string data'));
    assert.deepStrictEqual(result.current, 'string data');
  });
  // it('Should handle json blobs', function() {
  //   const blob = new Blob(['{"key":"value"}'], { type: 'application/json' });
  //   const { result } = renderHook(() => useRawData(blob));
  //   assert.deepStrictEqual(result.current, '{"key":"value"}');
  // });
});
