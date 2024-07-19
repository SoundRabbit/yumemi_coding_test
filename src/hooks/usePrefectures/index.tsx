import { useQuery } from '@tanstack/react-query';

import { fetchResas } from '@/utils/fetchResas';
import { PrefecturesResponse } from '@/utils/types/resasTypes';

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export const usePrefectures = () => {
  const { data } = useQuery({
    staleTime: Infinity,
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
