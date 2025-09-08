import { Metadata } from 'next';
import { PageHome } from './_components/page-home';

export const metadata: Metadata = {
  title: 'Home | Next Boilerplate',
  description: 'Welcome to your personalized dashboard. Access all your important information and features.',
  keywords: 'dashboard, home, overview, user panel',
};

export const permissions = [];

export default function Page() {
  return <PageHome />;
}
