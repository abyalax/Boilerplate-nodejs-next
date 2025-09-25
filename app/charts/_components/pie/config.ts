import { PieChartProps } from '~/components/charts/pie-chart';
import { formatCurrency } from '~/lib/utils';

type Data = {
  category: string;
  total_sales: string;
  total_profit: string;
  total_revenue: string;
  total_qty: string;
};

const data: Data[] = [
  {
    category: 'Electronics',
    total_sales: '125000',
    total_profit: '35000',
    total_revenue: '160000',
    total_qty: '120',
  },
  {
    category: 'Clothing',
    total_sales: '90000',
    total_profit: '25000',
    total_revenue: '115000',
    total_qty: '90',
  },
  {
    category: 'Books',
    total_sales: '45000',
    total_profit: '15000',
    total_revenue: '60000',
    total_qty: '60',
  },
  {
    category: 'Home & Kitchen',
    total_sales: '70000',
    total_profit: '20000',
    total_revenue: '90000',
    total_qty: '80',
  },
  {
    category: 'Sports',
    total_sales: '50000',
    total_profit: '12000',
    total_revenue: '65000',
    total_qty: '50',
  },
  {
    category: 'Beauty',
    total_sales: '30000',
    total_profit: '8000',
    total_revenue: '38000',
    total_qty: '30',
  },
];

const dataset: PieChartProps<Data>['dataset'] = {
  label: 'Total Sales',
  backgroundColor: ['#30b4e1', '#3b7ddd', '#23bf93', '#ff6b6b', '#ff9f43', '#e9c46a'],
  hoverBackgroundColor: ['#1e8fb7', '#2662b0', '#178068', '#cc5252', '#cc7c26', '#b89a4f'],
};

const config: PieChartProps<Data>['config'] = {
  tooltipFormatter: ({ value, label, rawData }) => [
    `${label}: ${value} items`,
    `Revenue: ${formatCurrency(rawData.total_revenue)}`,
    `Profit: ${formatCurrency(rawData.total_profit)}`,
    `Sales: ${formatCurrency(rawData.total_sales)}`,
  ],
};

export const configPieChart: PieChartProps<Data> = {
  loading: false,
  data,
  dataset,
  config,
  labelKey: 'category',
  valueKey: 'total_qty',
};
