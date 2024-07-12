import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { server } from '@/mocks/server';

import { usePopulationChartData } from './usePopulationChartData';

describe('usePopulationComposition', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test('maybePrefCodesが[1]でcategoryLabelが総人口のとき、chatDataは北海道の年別総人口になる', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const { result, rerender } = renderHook(() => usePopulationChartData([1], '総人口'), { wrapper });
    await waitFor(() => result.current.prefNames.size > 0 && result.current.prefCodes.length > 0);
    rerender();
    await waitFor(() => result.current.chartData.length > 0);
    rerender();

    expect(result.current.prefCodes).toEqual([1]);
    expect(result.current.prefNames.get(1)).toEqual('北海道');
    expect(result.current.chartData).toEqual([
      { year: 1960, 1: 5039206 },
      { year: 1965, 1: 5171800 },
      { year: 1970, 1: 5184287 },
      { year: 1975, 1: 5338206 },
      { year: 1980, 1: 5575989 },
      { year: 1985, 1: 5679439 },
      { year: 1990, 1: 5643647 },
      { year: 1995, 1: 5692321 },
      { year: 2000, 1: 5683062 },
      { year: 2005, 1: 5627737 },
      { year: 2010, 1: 5506419 },
      { year: 2015, 1: 5381733 },
      { year: 2020, 1: 5224614 },
    ]);
  });

  test('prefCodesが[1,2]でcategoryLabelが総人口のとき、chatDataは北海道と青森県の年別総人口になる', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const { result, rerender } = renderHook(() => usePopulationChartData([1, 2], '総人口'), { wrapper });
    await waitFor(() => result.current.prefNames.size > 0 && result.current.prefCodes.length > 0);
    rerender();
    await waitFor(() => result.current.chartData.length > 0);
    rerender();

    expect(result.current.prefCodes).toEqual([1, 2]);
    expect(result.current.prefNames.get(1)).toEqual('北海道');
    expect(result.current.prefNames.get(2)).toEqual('青森県');
    expect(result.current.chartData).toEqual([
      { year: 1960, 1: 5039206, 2: 1426606 },
      { year: 1965, 1: 5171800, 2: 1416591 },
      { year: 1970, 1: 5184287, 2: 1427520 },
      { year: 1975, 1: 5338206, 2: 1468646 },
      { year: 1980, 1: 5575989, 2: 1523907 },
      { year: 1985, 1: 5679439, 2: 1524448 },
      { year: 1990, 1: 5643647, 2: 1482873 },
      { year: 1995, 1: 5692321, 2: 1481663 },
      { year: 2000, 1: 5683062, 2: 1475728 },
      { year: 2005, 1: 5627737, 2: 1436657 },
      { year: 2010, 1: 5506419, 2: 1373339 },
      { year: 2015, 1: 5381733, 2: 1308265 },
      { year: 2020, 1: 5224614, 2: 1237984 },
    ]);
  });

  test('prefCodesに1～47の整数以外が含まれるとき、その値については戻り値に含めない', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const { result, rerender } = renderHook(() => usePopulationChartData([0, 1, 1.5], '総人口'), { wrapper });
    await waitFor(() => result.current.prefNames.size > 0 && result.current.prefCodes.length > 0);
    rerender();
    await waitFor(() => result.current.chartData.length > 0);
    rerender();

    expect(result.current.prefCodes).toEqual([1]);
    expect(result.current.prefNames.get(1)).toEqual('北海道');
    expect(result.current.chartData).toEqual([
      { year: 1960, 1: 5039206 },
      { year: 1965, 1: 5171800 },
      { year: 1970, 1: 5184287 },
      { year: 1975, 1: 5338206 },
      { year: 1980, 1: 5575989 },
      { year: 1985, 1: 5679439 },
      { year: 1990, 1: 5643647 },
      { year: 1995, 1: 5692321 },
      { year: 2000, 1: 5683062 },
      { year: 2005, 1: 5627737 },
      { year: 2010, 1: 5506419 },
      { year: 2015, 1: 5381733 },
      { year: 2020, 1: 5224614 },
    ]);
  });
});
