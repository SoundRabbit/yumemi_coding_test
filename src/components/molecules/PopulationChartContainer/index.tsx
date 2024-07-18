'use client';

import { PopulationChart } from '@/components/atoms/PopulationChart';
import { SelectPopulationCategory } from '@/components/atoms/SelectPopulationCategory';
import { SelectPrefectures } from '@/components/atoms/SelectPrefectures';

import { usePopulationChartContainer } from './usePopulationChartContainer';

export type PopulationChartContainerProps = {};

export const PopulationChartContainer = ({}: PopulationChartContainerProps) => {
  const {
    prefCodesSet,
    prefCodesList,
    populationCategoryLabel,
    handleChangeSelectedPref,
    handleChangePopulationCategoryLabel,
  } = usePopulationChartContainer();

  return (
    <>
      <SelectPrefectures prefCodesSet={prefCodesSet} onChangeSelect={handleChangeSelectedPref} />
      <SelectPopulationCategory
        categoryLabel={populationCategoryLabel}
        onChange={handleChangePopulationCategoryLabel}
      />
      <PopulationChart prefCodes={prefCodesList} categoryLabel={populationCategoryLabel} />
    </>
  );
};
