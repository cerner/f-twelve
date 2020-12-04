import { h } from 'preact';
import assert from 'assert';
import { renderHook } from '@testing-library/preact-hooks';
import useConsoleData from './useConsoleData';

describe('useConsoleData', function() {
  it('should default to an empty array', async function() {
    const { result } = renderHook(() => useConsoleData());
    assert.deepStrictEqual(result.current, []);
  });
});
