'use client';

import { PieChart } from '~/components/charts/pie-chart';
import { H2 } from '~/components/ui/typography';
import { configPieChart } from './config';

export const ExamplePieChart = () => {
  return (
    <div>
      <H2>Pie Chart</H2>
      <div className="h-[500px] w-full flex justify-center items-center">
        <PieChart {...configPieChart} />
      </div>
    </div>
  );
};
