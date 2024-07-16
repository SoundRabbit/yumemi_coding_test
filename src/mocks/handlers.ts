import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', async ({ request }) => {
    const apiKey = request.headers.get('X-API-KEY');
    if (apiKey !== process.env.RESAS_API_KEY) {
      return new HttpResponse(null, { status: 400 });
    }
    const { response } = await import('./resas/api/v1/prefectures');
    return HttpResponse.json(response);
  }),
  http.get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear', async ({ request }) => {
    const apiKey = request.headers.get('X-API-KEY');

    const url = new URL(request.url);
    const prefCode = Number(url.searchParams.get('prefCode'));
    if (apiKey !== process.env.RESAS_API_KEY) {
      return new HttpResponse(null, { status: 400 });
    }

    const { response } = await import('./resas/api/v1/population/composition/perYear');
    return HttpResponse.json(await response(prefCode));
  }),
];
