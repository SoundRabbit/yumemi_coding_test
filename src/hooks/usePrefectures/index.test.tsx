import { HttpResponse, http } from 'msw';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { response as prefecturesResponse } from '@/mocks/resas/api/v1/prefectures';
import { server } from '@/mocks/server';

import { usePrefectures } from './index';

let mockFetch: jest.Spied<typeof global.fetch> | undefined = undefined;

describe('usePrefectures', () => {
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

  test('APIエンドポイントがhttps://opendata.resas-portal.go.jp/api/v1/prefecturesになっている', async () => {
    mockFetch = jest.spyOn(global, 'fetch');
    const { result } = renderHook(() => usePrefectures(), {
      wrapper: ({ children }) => {
        return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
      },
    });
    await waitFor(() => expect(result.current).not.toEqual([]));
    expect(mockFetch).toHaveBeenCalledWith('https://opendata.resas-portal.go.jp/api/v1/prefectures', expect.anything());
  });

  test('都道府県一覧を取得している', async () => {
    const { result } = renderHook(() => usePrefectures(), {
      wrapper: ({ children }) => {
        return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
      },
    });
    await waitFor(() => expect(result.current).toEqual(prefecturesResponse.result));
  });

  test('レスポンスの形式に問題がある場合は、例外が発生する', async () => {
    server.use(http.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', (_) => HttpResponse.json({})));

    const queryClient = new QueryClient();

    renderHook(() => usePrefectures(), {
      wrapper: ({ children }) => {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
      },
    });

    await waitFor(() =>
      expect(queryClient.getQueryState(['prefectures'])?.fetchFailureReason?.message).toBe('Invalid response'),
    );
  });
});
