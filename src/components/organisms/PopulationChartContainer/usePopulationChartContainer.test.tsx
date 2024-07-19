import { act } from 'react';

import { renderHook } from '@testing-library/react';

import { usePopulationChartContainer } from './usePopulationChartContainer';

describe('usePopulationComposition', () => {
  test('初期値が空になっている', () => {
    const { result } = renderHook(() => usePopulationChartContainer());
    expect(result.current.prefCodesSet).toEqual(new Set());
    expect(result.current.prefCodesList).toEqual([]);
  });

  test('prefCodesSetを1にするとprefCodesListが[1]になる', () => {
    const { result } = renderHook(() => usePopulationChartContainer());
    act(() => {
      result.current.handleChangeSelectedPref(new Set([1]));
    });
    expect(result.current.prefCodesSet).toEqual(new Set([1]));
    expect(result.current.prefCodesList).toEqual([1]);
  });

  test('prefCodesSetを1にした後、2を追加するとprefCodesListが[1,2]になる', () => {
    const { result } = renderHook(() => usePopulationChartContainer());
    act(() => {
      result.current.handleChangeSelectedPref(new Set([1]));
    });
    act(() => {
      result.current.handleChangeSelectedPref(new Set([1, 2]));
    });
    expect(result.current.prefCodesSet).toEqual(new Set([1, 2]));
    expect(result.current.prefCodesList).toEqual([1, 2]);
  });

  test('prefCodesSetを2にした後、1を追加するとprefCodesListが[1,2]になる', () => {
    const { result } = renderHook(() => usePopulationChartContainer());
    act(() => {
      result.current.handleChangeSelectedPref(new Set([2]));
    });
    act(() => {
      result.current.handleChangeSelectedPref(new Set([2, 1]));
    });
    expect(result.current.prefCodesSet).toEqual(new Set([1, 2]));
    expect(result.current.prefCodesList).toEqual([1, 2]);
  });
});
