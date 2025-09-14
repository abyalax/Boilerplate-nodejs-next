import { Metadata } from 'next';
import { PageOrder } from './_components/page-order';

export const metadata: Metadata = {
  title: 'Order | Next Boilerplate',
  description: 'Welcome to your personalized dashboard. Access all your important information and features.',
  keywords: 'Order, dashboard, home, overview, user panel',
};

export const permissions = [];

export default function Page() {
  return <PageOrder />;
}
