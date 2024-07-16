import { useMemo, useState } from 'react';

export const usePopulationChartContainer = () => {
  const [prefCodesSet, setPrefCodeSet] = useState(new Set<number>());
  const prefCodesList = useMemo(() => Array.from(prefCodesSet).sort(), [prefCodesSet]);

  return {
    prefCodesSet,
    prefCodesList,
    handleChangeSelectedPref: setPrefCodeSet,
  };
};
