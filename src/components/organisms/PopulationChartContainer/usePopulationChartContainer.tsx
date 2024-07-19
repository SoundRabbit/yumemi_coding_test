import { useMemo, useState } from 'react';

import { PopulationCategoryLabel } from '@/utils/types/resasTypes';

export const usePopulationChartContainer = () => {
  const [prefCodesSet, setPrefCodeSet] = useState(new Set<number>());
  const prefCodesList = useMemo(() => Array.from(prefCodesSet).sort(), [prefCodesSet]);

  const [populationCategoryLabel, setPopulationCategoryLabel] = useState<PopulationCategoryLabel>('総人口');

  return {
    prefCodesSet,
    prefCodesList,
    populationCategoryLabel,
    handleChangeSelectedPref: setPrefCodeSet,
    handleChangePopulationCategoryLabel: setPopulationCategoryLabel,
  };
};
