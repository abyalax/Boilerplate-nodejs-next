import { Metadata } from 'next';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Charts | Next Boilerplate',
  description: 'Welcome to your personalized dashboard. Access all your important information and features.',
  keywords: 'Charts, dashboard, home, overview, user panel',
};

export const permissions = [];

export default async function Page() {
  // simulate delay loading
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <Component />;
}
