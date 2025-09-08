import { Metadata } from 'next';
import { PageAdmin } from './_components/page-admin';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Next Boilerplate',
  description: 'Administrative dashboard for managing users, settings, and system configurations',
  keywords: 'admin, dashboard, management, users, settings',
};

export const permissions = ['read:user', 'create:user'];

export default function Page() {
  return <PageAdmin />;
}
