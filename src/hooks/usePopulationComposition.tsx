import * as t from 'io-ts';
import { useMemo } from 'react';

import { useQueries } from '@tanstack/react-query';

import { fetchResas } from '@/utils/fetchResas';

const PopulationCompositionResponse = t.type({
  result: t.type({
    boundaryYear: t.number,
    data: t.array(
      t.type({
        label: t.string,
        data: t.array(
          t.type({
            year: t.number,
            value: t.number,
          }),
        ),
      }),
    ),
  }),
});

type PopulationCompositionResponse = t.TypeOf<typeof PopulationCompositionResponse>;

export type PopulationComposition = {
  boundaryYear: number;
  data: Map<
    string,
    {
      year: number;
      value: number;
    }[]
  >;
};

export const usePopulationComposition = (prefCodes: number[]) => {
  const queries = useMemo(() => {
    return prefCodes.map((prefCode) => {
      return {
        queryKey: ['population/composition/perYear', prefCode],
        queryFn: async () => {
          const response = await fetchResas('/population/composition/perYear', {
            prefCode: prefCode,
            cityCode: '-',
          });

          const result = PopulationCompositionResponse.decode(response);
          if (result._tag === 'Left') {
            throw new Error('Invalid response');
          }

          return { prefCode, ...result.right.result };
        },
      };
    });
  }, [prefCodes]);

  const data = useQueries({
    queries,
    combine: (results) => {
      return results.reduce((acc, result) => {
        if (!result.isSuccess) return acc;

        const prefCode = result.data.prefCode;
        const boundaryYear = result.data.boundaryYear;
        const data = result.data.data.reduce((acc, data) => {
          acc.set(
            data.label,
            data.data.map(({ year, value }) => ({ year, value })),
          );
          return acc;
        }, new Map<string, { year: number; value: number }[]>());

        acc.set(prefCode, { boundaryYear, data });

        return acc;
      }, new Map<number, PopulationComposition>());
    },
  });

  return data;
};
