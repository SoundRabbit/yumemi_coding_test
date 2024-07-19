import { HttpResponse, http } from 'msw';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { server } from '@/mocks/server';

import { usePopulationComposition } from './index';

let mockFetch: jest.Spied<typeof global.fetch> | undefined = undefined;

describe('usePopulationComposition', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    mockFetch?.mockRestore();
  });

  afterAll(() => {
    server.close();
  });

  test('APIエンドポイントがhttps://opendata.resas-portal.go.jp/api/v1/population/composition/perYearになっている', async () => {
    mockFetch = jest.spyOn(global, 'fetch');

    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const { result } = renderHook(() => usePopulationComposition([1]), { wrapper });
    await waitFor(() => result.current.size > 0);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(
        new RegExp(
          'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?'.replace(/([.?])/g, '\\$1') +
            '(prefCode=1&cityCode=-|cityCode=-&prefCode=1)',
        ),
      ),
      expect.anything(),
    );
  });

  test('prefCode=1の人口構成データを取得している', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const { result, rerender } = renderHook(() => usePopulationComposition([1]), { wrapper });
    await waitFor(() => result.current.size > 0);
    rerender();

    const { response: populationComposition } = await import('@/mocks/resas/api/v1/population/composition/perYear/_1');
    const expected = new Map([
      [
        1,
        {
          boundaryYear: populationComposition.result.boundaryYear,
          data: new Map(
            populationComposition.result.data.map((data) => [
              data.label,
              data.data.map(({ year, value }) => ({ year, value })),
            ]),
          ),
        },
      ],
    ]);
    expect(result.current).toEqual(expected);
  });

  test('レスポンスの形式に問題がある場合は、例外が発生する', async () => {
    server.use(
      http.get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear', (_) =>
        HttpResponse.json({}),
      ),
    );

    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    renderHook(() => usePopulationComposition([1]), { wrapper });

    await waitFor(() =>
      expect(queryClient.getQueryState(['population/composition/perYear', 1])?.fetchFailureReason?.message).toBe(
        'Invalid response',
      ),
    );
  });
});
