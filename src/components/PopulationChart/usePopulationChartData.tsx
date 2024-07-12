import { useMemo } from 'react';

import { usePopulationComposition } from '@/hooks/usePopulationComposition';
import { usePrefectures } from '@/hooks/usePrefectures';

export const usePopulationChartData = (maybePrefCodes: number[], categoryLabel: string) => {
  const prefectures = usePrefectures();

  const prefNames = useMemo(
    () => new Map(prefectures.map(({ prefCode, prefName }) => [prefCode, prefName])),
    [prefectures],
  );
  const prefCodes = useMemo(
    () => maybePrefCodes.filter((prefCode) => prefNames.has(prefCode)),
    [maybePrefCodes, prefNames],
  );

  const populationCompositions = usePopulationComposition(prefCodes);

  const chartData = useMemo(() => {
    const years: number[] = [];
    const dataMap = new Map<number, Record<number, number>>();

    for (const [prefCode, { boundaryYear, data: populationComposition }] of populationCompositions.entries()) {
      const populations = populationComposition.get(categoryLabel);

      if (populations) {
        for (const { year, value } of populations) {
          if (year > boundaryYear) continue;

          const dataItem = dataMap.get(year);
          if (dataItem) {
            dataItem[prefCode] = value;
          } else {
            dataMap.set(year, { [prefCode]: value });
            years.push(year);
          }
        }
      }
    }

    years.sort();

    return years.map((year) => {
      const populationByPref = dataMap.get(year);
      return {
        year,
        ...populationByPref,
      };
    });
  }, [categoryLabel, populationCompositions]);

  return {
    prefCodes,
    prefNames,
    chartData,
  };
};
