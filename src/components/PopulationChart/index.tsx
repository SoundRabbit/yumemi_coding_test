'use client';

import { Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { usePopulationChartData } from './usePopulationChartData';

export type PopulationChartProps = {
  prefCodes: number[];
  categoryLabel: string;
};

export const PopulationChart = ({ prefCodes: maybePrefCodes, categoryLabel }: PopulationChartProps) => {
  const { prefCodes, prefNames, chartData } = usePopulationChartData(maybePrefCodes, categoryLabel);

  return (
    <ResponsiveContainer width={'100%'} height={800}>
      <LineChart data={chartData} margin={{ top: 0, right: 60, left: 60, bottom: 30 }}>
        <Tooltip />
        <Legend align={'right'} verticalAlign={'top'} />
        {prefCodes.map((prefCode) => (
          <Line key={prefCode} dataKey={prefCode} type='monotone' name={prefNames.get(prefCode)} />
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
