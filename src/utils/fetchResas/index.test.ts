/* @jest-environment node */
import { fetchResas } from './index';

let mockFetch: jest.Spied<typeof fetch> | undefined = undefined;

describe('fetchResas', () => {
  afterEach(() => {
    mockFetch?.mockRestore();
  });

  test('/で始まるパスから、APIエンドポイントを作成している', async () => {
    mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify({}), { status: 200 }));

    await fetchResas('/prefectures', {});
    expect(fetch).toHaveBeenCalledWith('https://opendata.resas-portal.go.jp/api/v1/prefectures', expect.anything());
  });

  test('/で始まらないパスから、APIエンドポイントを作成している', async () => {
    mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify({}), { status: 200 }));

    await fetchResas('prefectures', {});
    expect(fetch).toHaveBeenCalledWith('https://opendata.resas-portal.go.jp/api/v1/prefectures', expect.anything());
  });

  test('fetch時に、X-API-KEYにAPIキーが設定されている', async () => {
    mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify({}), { status: 200 }));

    await fetchResas('/prefectures', {});
    expect(fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        headers: {
          'X-API-KEY': process.env.RESAS_API_KEY,
        },
      }),
    );
  });

  test('fetch時に、パラメータがクエリ文字列に設定されている', async () => {
    mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify({}), { status: 200 }));

    await fetchResas('/prefectures', { param1: 'value1', param2: 2 });
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('param1=value1'), expect.anything());
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('param2=2'), expect.anything());
  });

  test('fetch時に、ステータスコードが200以外の場合は例外をthrowする', async () => {
    mockFetch = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({}), { status: 400, statusText: 'Bad Request' }));

    const { fetchResas } = await import('./index');

    await expect(fetchResas('/prefectures', {})).rejects.toThrow('Bad Request');
  });

  test('APIキーが設定されていない場合は例外をthrowする', async () => {
    const replacedEnv = jest.replaceProperty(process, 'env', { ...process.env, RESAS_API_KEY: undefined });
    mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify({}), { status: 200 }));

    await expect(fetchResas('/prefectures', {})).rejects.toThrow('RESAS_API_KEY is not set');

    replacedEnv.restore();
  });

  test('fetchに成功した場合は、JSONを返す', async () => {
    mockFetch = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ key: 'value' }), { status: 200 }));

    const result = await fetchResas('/prefectures', {});

    expect(result).toEqual({ key: 'value' });
  });
});
