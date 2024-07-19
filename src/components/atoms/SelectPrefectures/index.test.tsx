import { act } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { server } from '@/mocks/server';

import { SelectPrefectures } from './index';

describe('SelectPrefectures', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test('すべての都道府県が選択肢にある', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const prefCodesSet = new Set<number>();
    const handleChangePrefCodesSet = jest.fn();

    render(<SelectPrefectures prefCodesSet={prefCodesSet} onChangeSelect={handleChangePrefCodesSet} />, { wrapper });
    await Promise.all([
      expect(screen.findByLabelText('北海道')).resolves.toBeDefined(),
      expect(screen.findByLabelText('青森県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('岩手県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('宮城県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('秋田県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('山形県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('福島県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('茨城県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('栃木県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('群馬県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('埼玉県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('千葉県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('東京都')).resolves.toBeDefined(),
      expect(screen.findByLabelText('神奈川県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('新潟県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('富山県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('石川県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('福井県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('山梨県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('長野県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('岐阜県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('静岡県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('愛知県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('三重県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('滋賀県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('京都府')).resolves.toBeDefined(),
      expect(screen.findByLabelText('大阪府')).resolves.toBeDefined(),
      expect(screen.findByLabelText('兵庫県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('奈良県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('和歌山県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('鳥取県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('島根県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('岡山県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('広島県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('山口県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('徳島県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('香川県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('愛媛県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('高知県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('福岡県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('佐賀県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('長崎県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('熊本県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('大分県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('宮崎県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('鹿児島県')).resolves.toBeDefined(),
      expect(screen.findByLabelText('沖縄県')).resolves.toBeDefined(),
    ]);
  });

  test('北海道をクリックすると、[1]としてonChangeSelectが発火する', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const prefCodesSet = new Set<number>();
    const handleChangePrefCodesSet = jest.fn();
    render(<SelectPrefectures prefCodesSet={prefCodesSet} onChangeSelect={handleChangePrefCodesSet} />, { wrapper });

    const checkbox = await screen.findByLabelText('北海道');
    act(() => {
      checkbox.click();
    });

    expect(handleChangePrefCodesSet).toHaveBeenCalledWith(new Set([1]));
  });

  test('prefCodesSetが[1]のとき、青森県をクリックすると、[1,2]としてonChangeSelectが発火する', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const prefCodesSet = new Set<number>([1]);
    const handleChangePrefCodesSet = jest.fn();
    render(<SelectPrefectures prefCodesSet={prefCodesSet} onChangeSelect={handleChangePrefCodesSet} />, { wrapper });

    const checkbox = await screen.findByLabelText('青森県');
    act(() => {
      checkbox.click();
    });

    expect(handleChangePrefCodesSet).toHaveBeenCalledWith(new Set([1, 2]));
  });

  test('prefCodesSetが[1,2]のとき、北海道をクリックすると、[2]としてonChangeSelectが発火する', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const prefCodesSet = new Set<number>([1, 2]);
    const handleChangePrefCodesSet = jest.fn();
    render(<SelectPrefectures prefCodesSet={prefCodesSet} onChangeSelect={handleChangePrefCodesSet} />, { wrapper });

    const checkbox = await screen.findByLabelText('北海道');
    act(() => {
      checkbox.click();
    });

    expect(handleChangePrefCodesSet).toHaveBeenCalledWith(new Set([2]));
  });
});
