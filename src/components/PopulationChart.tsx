import React from 'react';
import { PopulationStat } from '../assets/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface PopulationChartProps {
  data: PopulationStat[];
}

const PopulationChart: React.FC<PopulationChartProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => a.year - b.year);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={sortedData}
        margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 10 }}
          padding={{ left: 0, right: 0 }}
          tickMargin={8}
        />
        <YAxis
          tick={{ fontSize: 10 }}
          tickFormatter={(val) => val.toLocaleString()}
          width={40}
        />
        <Tooltip formatter={(value: number) => value.toLocaleString()} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PopulationChart;
