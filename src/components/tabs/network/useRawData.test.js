import { h } from 'preact';
import assert from 'assert';
import useRawData from './useRawData';
import { renderHook } from '@testing-library/preact-hooks';
import { waitFor } from '@testing-library/dom';

describe('useRawData', function() {
  it('should handle strings', function() {
    const { result } = renderHook(() => useRawData('string data'));
    assert.deepStrictEqual(result.current, 'string data');
  });
  it('should handle json blobs', async function() {
    const blob = new Blob(['{"key":"value"}'], { type: 'application/json' });
    const { result } = renderHook(() => useRawData(blob));
    await waitFor(() =>
      assert.deepStrictEqual(result.current, '{"key":"value"}')
    );
  });
});
