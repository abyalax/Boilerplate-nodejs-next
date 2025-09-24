export type DataBubbleChart = {
  name: string;
  category: string;
  revenue: string;
  margin_percentage: string;
  quantity: number;
};

export const data: DataBubbleChart[] = [
  {
    name: 'T-Shirts Blue',
    category: 'fashion',
    revenue: '20000000', // Rp 20 juta
    margin_percentage: '0.40', // 40%
    quantity: 500,
  },
  {
    name: 'Samsung Galaxy S23',
    category: 'electronics',
    revenue: '150000000', // Rp 150 juta
    margin_percentage: '0.15', // 15%
    quantity: 120,
  },
  {
    name: 'Coffee Maker',
    category: 'home appliances',
    revenue: '35000000', // Rp 35 juta
    margin_percentage: '0.25', // 25%
    quantity: 250,
  },
  {
    name: 'Running Shoes',
    category: 'sports',
    revenue: '80000000', // Rp 80 juta
    margin_percentage: '0.30', // 30%
    quantity: 300,
  },
  {
    name: 'Book: The Great Gatsby',
    category: 'books',
    revenue: '5000000', // Rp 5 juta
    margin_percentage: '0.50', // 50%
    quantity: 400,
  },
];
