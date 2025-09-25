'use client';

import { BarChart } from '~/components/charts/bar-chart';
import { H2 } from '~/components/ui/typography';
import { barChartConfig } from './config';

export const ExampleBarChart = () => (
  <div>
    <H2>Bar Chart</H2>
    <BarChart {...barChartConfig} />
  </div>
);
