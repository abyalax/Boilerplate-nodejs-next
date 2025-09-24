import { Metadata } from 'next';

import { PagePricing } from './_components/page-pricing';

export const metadata: Metadata = {
  title: 'Pricing | Next Boilerplate',
  description: 'Welcome to your personalized dashboard. Access all your important information and features.',
  keywords: 'pricing, dashboard, home, overview, user panel',
};

export const permissions = [];

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <PagePricing />;
}
