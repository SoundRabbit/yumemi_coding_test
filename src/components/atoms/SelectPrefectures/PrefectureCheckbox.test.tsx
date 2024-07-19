import { act } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { server } from '@/mocks/server';

import { PrefectureCheckbox } from './PrefectureCheckbox';

describe('PrefectureCheckbox', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test('prefNameが表示される', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const handleChange = jest.fn();

    render(<PrefectureCheckbox prefCode={1} prefName={'北海道'} isChecked={false} onChange={handleChange} />, {
      wrapper,
    });
    await expect(screen.findByText('北海道')).resolves.toBeDefined();
  });

  test('inputにprefCodeが設定されている', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const handleChange = jest.fn();

    render(<PrefectureCheckbox prefCode={1} prefName={'北海道'} isChecked={false} onChange={handleChange} />, {
      wrapper,
    });

    const checkbox = await screen.findByLabelText('北海道');
    expect(checkbox).toHaveProperty('value', '1');
  });

  test('isChecked=falseのとき、inputのcheckedがfalseになる', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const handleChange = jest.fn();

    render(<PrefectureCheckbox prefCode={1} prefName={'北海道'} isChecked={false} onChange={handleChange} />, {
      wrapper,
    });

    const checkbox = await screen.findByLabelText('北海道');
    expect(checkbox).toHaveProperty('checked', false);
  });

  test('isChecked=trueのとき、inputのcheckedがtrueになる', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const handleChange = jest.fn();

    render(<PrefectureCheckbox prefCode={1} prefName={'北海道'} isChecked={true} onChange={handleChange} />, {
      wrapper,
    });

    const checkbox = await screen.findByLabelText('北海道');
    expect(checkbox).toHaveProperty('checked', true);
  });

  test('prefCode=1、isChecked=falseのとき、チェックボックスをクリックするとonChangeが(1,true)で発火する', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const handleChange = jest.fn();

    render(<PrefectureCheckbox prefCode={1} prefName={'北海道'} isChecked={false} onChange={handleChange} />, {
      wrapper,
    });

    const checkbox = await screen.findByLabelText('北海道');
    act(() => {
      checkbox.click();
    });

    expect(handleChange).toHaveBeenCalledWith(1, true);
  });

  test('prefCode=1、isChecked=trueのとき、チェックボックスをクリックするとonChangeが(1,false)で発火する', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

    const handleChange = jest.fn();

    render(<PrefectureCheckbox prefCode={1} prefName={'北海道'} isChecked={true} onChange={handleChange} />, {
      wrapper,
    });

    const checkbox = await screen.findByLabelText('北海道');
    act(() => {
      checkbox.click();
    });

    expect(handleChange).toHaveBeenCalledWith(1, false);
  });
});
