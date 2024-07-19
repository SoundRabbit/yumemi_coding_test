import { act } from 'react';

import { render } from '@testing-library/react';

import { server } from '@/mocks/server';

import { SelectPopulationCategory } from './index';

describe('SelectPopulationCategory', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test('「総人口」「年少人口」「生産年齢人口」「老年人口」の選択肢が表示される', async () => {
    const handleChange = jest.fn();

    render(<SelectPopulationCategory categoryLabel={'総人口'} onChange={handleChange} />);

    expect(document.querySelector('option[value="総人口"]')).not.toBeNull();
    expect(document.querySelector('option[value="年少人口"]')).not.toBeNull();
    expect(document.querySelector('option[value="生産年齢人口"]')).not.toBeNull();
    expect(document.querySelector('option[value="老年人口"]')).not.toBeNull();
  });

  test('categoryLabel="総人口"のとき、「総人口」が選択されている', async () => {
    const handleChange = jest.fn();

    render(<SelectPopulationCategory categoryLabel={'総人口'} onChange={handleChange} />);

    const select = document.querySelector('select') as HTMLSelectElement;

    expect(select.value).toBe('総人口');
  });

  test('categoryLabel="年少人口"のとき、「年少人口」が選択されている', async () => {
    const handleChange = jest.fn();

    render(<SelectPopulationCategory categoryLabel={'年少人口'} onChange={handleChange} />);

    const select = document.querySelector('select') as HTMLSelectElement;

    expect(select.value).toBe('年少人口');
  });

  test('categoryLabel="生産年齢人口"のとき、「生産年齢人口」が選択されている', async () => {
    const handleChange = jest.fn();

    render(<SelectPopulationCategory categoryLabel={'生産年齢人口'} onChange={handleChange} />);

    const select = document.querySelector('select') as HTMLSelectElement;

    expect(select.value).toBe('生産年齢人口');
  });

  test('categoryLabel="老年人口"のとき、「老年人口」が選択されている', async () => {
    const handleChange = jest.fn();

    render(<SelectPopulationCategory categoryLabel={'老年人口'} onChange={handleChange} />);

    const select = document.querySelector('select') as HTMLSelectElement;

    expect(select.value).toBe('老年人口');
  });

  test('「総人口」を選択すると、onChangeが("総人口")で発火する', async () => {
    const handleChange = jest.fn();

    render(<SelectPopulationCategory categoryLabel={'総人口'} onChange={handleChange} />);

    const select = document.querySelector('select') as HTMLSelectElement;
    act(() => {
      select.value = '総人口';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });

    expect(handleChange).toHaveBeenCalledWith('総人口');
  });

  test('「年少人口」を選択すると、onChangeが("年少人口")で発火する', async () => {
    const handleChange = jest.fn();

    render(<SelectPopulationCategory categoryLabel={'総人口'} onChange={handleChange} />);

    const select = document.querySelector('select') as HTMLSelectElement;
    act(() => {
      select.value = '年少人口';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });

    expect(handleChange).toHaveBeenCalledWith('年少人口');
  });

  test('「生産年齢人口」を選択すると、onChangeが("生産年齢人口")で発火する', async () => {
    const handleChange = jest.fn();

    render(<SelectPopulationCategory categoryLabel={'総人口'} onChange={handleChange} />);

    const select = document.querySelector('select') as HTMLSelectElement;
    act(() => {
      select.value = '生産年齢人口';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });

    expect(handleChange).toHaveBeenCalledWith('生産年齢人口');
  });

  test('「老年人口」を選択すると、onChangeが("老年人口")で発火する', async () => {
    const handleChange = jest.fn();

    render(<SelectPopulationCategory categoryLabel={'総人口'} onChange={handleChange} />);

    const select = document.querySelector('select') as HTMLSelectElement;
    act(() => {
      select.value = '老年人口';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });

    expect(handleChange).toHaveBeenCalledWith('老年人口');
  });
});
