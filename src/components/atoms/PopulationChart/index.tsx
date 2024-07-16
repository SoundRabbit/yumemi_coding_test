import { useCallback } from 'react';
import { Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { usePopulationChartData } from './usePopulationChartData';

const lineColors = ['#1971FF', '#00B06B', '#F6AA00', '#FF4B00', '#990099'];
const lineDashes = [undefined, '6', '12 4 4 4'];
const lineStyles = lineDashes.flatMap((strokeDasharray) => lineColors.map((stroke) => ({ stroke, strokeDasharray })));

export type PopulationChartProps = {
  prefCodes: number[];
  categoryLabel: string;
};

export const PopulationChart = ({ prefCodes: maybePrefCodes, categoryLabel }: PopulationChartProps) => {
  const { prefCodes, prefNames, chartData } = usePopulationChartData(maybePrefCodes, categoryLabel);

  const itemSorter = useCallback((item: { value?: unknown }) => (typeof item.value === 'number' ? -item.value : 0), []);

  return (
    <ResponsiveContainer width={'100%'} height={800}>
      <LineChart data={chartData} margin={{ top: 0, right: 60, left: 60, bottom: 30 }}>
        <Tooltip itemSorter={itemSorter} />
        <Legend align={'right'} verticalAlign={'top'} />
        {prefCodes.map((prefCode, index) => (
          <Line
            key={prefCode}
            dataKey={prefCode}
            type='monotone'
            name={prefNames.get(prefCode)}
            stroke={lineStyles[index % lineStyles.length].stroke}
            strokeDasharray={lineStyles[index % lineStyles.length].strokeDasharray}
          />
        ))}
        <XAxis dataKey={'year'}>
          <Label position={'insideBottom'} offset={-10}>
            年度
          </Label>
        </XAxis>
        <YAxis>
          <Label angle={-90} position={'insideLeft'} offset={-40}>
            人口
          </Label>
        </YAxis>
      </LineChart>
    </ResponsiveContainer>
  );
};
