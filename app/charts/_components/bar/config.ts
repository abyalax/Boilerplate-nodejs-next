import { BarChartProps } from '~/components/charts/bar-chart';

type Data = {
  product_name: string;
  sales_amount: string;
  region: string;
};

const data: Data[] = [
  {
    product_name: 'MacBook Air M2',
    sales_amount: '150000000',
    region: 'Jakarta',
  },
  {
    product_name: 'iPhone 14 Pro',
    sales_amount: '220000000',
    region: 'Surabaya',
  },
  {
    product_name: 'iPad Air 5th Gen',
    sales_amount: '80000000',
    region: 'Bandung',
  },
  {
    product_name: 'Apple Watch Series 8',
    sales_amount: '55000000',
    region: 'Jakarta',
  },
  {
    product_name: 'AirPods Pro 2nd Gen',
    sales_amount: '30000000',
    region: 'Surabaya',
  },
  {
    product_name: 'Mac Mini M2',
    sales_amount: '70000000',
    region: 'Medan',
  },
  {
    product_name: 'iPhone 14',
    sales_amount: '180000000',
    region: 'Jakarta',
  },
  {
    product_name: 'MacBook Pro 14 inch',
    sales_amount: '250000000',
    region: 'Surabaya',
  },
  {
    product_name: 'iPad Pro 11 inch',
    sales_amount: '120000000',
    region: 'Bandung',
  },
  {
    product_name: 'Apple TV 4K',
    sales_amount: '20000000',
    region: 'Medan',
  },
];

export const barChartConfig: BarChartProps<Data> = {
  loading: false,
  data: data?.map((item) => ({
    label: item.product_name,
    value: item.sales_amount,
    region: item.region,
  })),
  options: {
    chart: {
      title: 'Sales Performance',
      categoryKey: 'region',
      horizontal: false,
    },
    colors: {
      text: '#374151',
      base: 'rgba(13, 121, 179, 1)',
      hover: 'rgba(0, 96, 160, 1)',
    },
  },
};
