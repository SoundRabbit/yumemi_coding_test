import { useMemo, useState } from 'react';

export const usePopulationChartContainer = () => {
  const [prefCodesSet, setPrefCodeSet] = useState(new Set<number>());
  const prefCodesList = useMemo(() => Array.from(prefCodesSet).sort(), [prefCodesSet]);

  const [populationCategoryLabel, setPopulationCategoryLabel] = useState('総人口');

  return {
    prefCodesSet,
    prefCodesList,
    populationCategoryLabel,
    handleChangeSelectedPref: setPrefCodeSet,
    handleChangePopulationCategoryLabel: setPopulationCategoryLabel,
  };
};
