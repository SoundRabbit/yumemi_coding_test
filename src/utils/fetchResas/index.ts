'use server';

export async function fetchResas(path: string, params: Record<string, string | number>) {
  const apiKey = process.env.RESAS_API_KEY;
  if (!apiKey) {
    throw new Error('RESAS_API_KEY is not set');
  }

  const endpoint = `https://opendata.resas-portal.go.jp/api/v1${path.at(0) === '/' ? '' : '/'}${path}`;
  const url = new URL(endpoint);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });

  const response = await fetch(url.toString(), {
    headers: {
      'X-API-KEY': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
