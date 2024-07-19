'use client';

import { PopulationChart } from '@/components/atoms/PopulationChart';
import { SelectPopulationCategory } from '@/components/atoms/SelectPopulationCategory';
import { SelectPrefectures } from '@/components/molecules/SelectPrefectures';

import styles from './index.module.scss';
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
    <section className={styles['container']}>
      <div className={styles['item--full']}>
        <SelectPrefectures prefCodesSet={prefCodesSet} onChangeSelect={handleChangeSelectedPref} />
      </div>
      <SelectPopulationCategory
        categoryLabel={populationCategoryLabel}
        onChange={handleChangePopulationCategoryLabel}
      />
      <div className={styles['item--full']}>
        <PopulationChart prefCodes={prefCodesList} categoryLabel={populationCategoryLabel} />
      </div>
    </section>
  );
};
