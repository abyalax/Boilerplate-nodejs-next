import { ChartDatasetConfig, LineChartConfig, LineChartProps } from '~/components/charts/line-chart';

type Data = {
  month: string;
  revenue: number;
  profit: number;
};

// Example data source (T)
const data: Data[] = [
  { month: 'Jan', revenue: 12000, profit: 3500 },
  { month: 'Feb', revenue: 15000, profit: 4200 },
  { month: 'Mar', revenue: 18000, profit: 5000 },
  { month: 'Apr', revenue: 14000, profit: 3100 },
  { month: 'May', revenue: 20000, profit: 6200 },
  { month: 'Jun', revenue: 22000, profit: 7100 },
];

const datasets: ChartDatasetConfig[] = [
  {
    label: 'Revenue',
    dataKey: 'revenue',
    borderColor: '#4F46E5', // indigo-600
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    tension: 0.3,
    pointRadius: 4,
    fill: false,
  },
  {
    label: 'Profit',
    dataKey: 'profit',
    borderColor: '#10B981', // emerald-500
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    tension: 0.4,
    borderDash: [6, 4],
    pointRadius: 4,
    fill: false,
  },
  // ....Add more datasets as needed
];

// Chart configuration
const config: LineChartConfig = {
  aspectRatio: 6 / 2,
  responsive: true,
  showLegend: true,
  enableTooltips: true,
  interactionMode: 'index',
  tooltipFormatter: (value, label) => `${label}: $${value}`,
};

const labelKey = 'month';

export const lineChartConfig: LineChartProps<Data> = {
  loading: false,
  datasets,
  config,
  data,
  labelKey,
};
