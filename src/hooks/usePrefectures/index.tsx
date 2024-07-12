import * as t from 'io-ts';

import { useQuery } from '@tanstack/react-query';

import { fetchResas } from '@/utils/fetchResas';

const PrefecturesResponse = t.type({
  result: t.array(
    t.type({
      prefCode: t.number,
      prefName: t.string,
    }),
  ),
});

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export const usePrefectures = () => {
  const { data } = useQuery({
    queryKey: ['prefectures'],
    queryFn: async () => {
      const response = await fetchResas('/prefectures', {});

      const result = PrefecturesResponse.decode(response);
      if (result._tag === 'Left') {
        throw new Error('Invalid response');
      }

      return result.right.result;
    },
  });

  return data ?? [];
};
