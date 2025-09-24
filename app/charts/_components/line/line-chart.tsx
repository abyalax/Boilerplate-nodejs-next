'use client';

import { LineChart } from '~/components/charts/line-chart';
import { H2 } from '~/components/ui/typography';
import { lineChartConfig } from './config';

export const ExampleLineChart = () => {
  return (
    <div>
      <H2>Line Chart</H2>
      <LineChart {...lineChartConfig} />
    </div>
  );
};
