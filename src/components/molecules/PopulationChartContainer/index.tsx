'use client';

import { PopulationChart } from '@/components/atoms/PopulationChart';
import { SelectPrefectures } from '@/components/atoms/SelectPrefectures';

import { usePopulationChartContainer } from './usePopulationChartContainer';

export type PopulationChartContainerProps = {};

export const PopulationChartContainer = ({}: PopulationChartContainerProps) => {
  const { prefCodesSet, prefCodesList, handleChangeSelectedPref } = usePopulationChartContainer();

  return (
    <>
      <SelectPrefectures prefCodesSet={prefCodesSet} onChangeSelect={handleChangeSelectedPref} />
      <PopulationChart prefCodes={prefCodesList} categoryLabel='総人口' />
    </>
  );
};
