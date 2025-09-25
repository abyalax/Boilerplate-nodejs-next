'use client';

import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  Tooltip,
} from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { FC } from 'react';
import { Flex } from '~/components/layouts/flex';
import { H1 } from '~/components/ui/typography';
import { ExampleBarChart } from './bar/bar-chart';
import { ExampleBubbleChart } from './bubble/bubble-chart';
import { ExampleClusteredBarChart } from './clustered/index';
import { ExampleHeatmapChart } from './heatmap/index';
import { ExampleLineChart } from './line/line-chart';
import { ExamplePieChart } from './pie/pie-chart';

Chart.register([
  CategoryScale,
  LinearScale,
  PieController,
  LineController,
  BarController,
  MatrixController,
  BubbleController,
  MatrixElement,
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
]);

export const Component: FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <H1>Chart Components</H1>
      <Flex direction="column" gap={200}>
        <ExampleLineChart />
        <ExamplePieChart />
        <ExampleBubbleChart />
        <ExampleBarChart />
        <ExampleHeatmapChart />
        <ExampleClusteredBarChart />
      </Flex>
    </div>
  );
};
