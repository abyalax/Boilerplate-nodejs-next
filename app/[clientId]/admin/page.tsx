import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';

export const metadata: Metadata = {
  title: 'Client Admin Dashboard | Next Boilerplate',
  description: 'Client Admin dashboard for managing users, settings, and system configurations',
  keywords: 'client, admin, dashboard, management, users, settings',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ];

export default function Page() {
  return <div>Client Admin Dashboard</div>;
}
