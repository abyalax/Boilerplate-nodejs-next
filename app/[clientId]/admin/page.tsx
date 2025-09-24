import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';

export const metadata: Metadata = {
  title: 'Client Admin Dashboard | Next Boilerplate',
  description: 'Client Admin dashboard for managing users, settings, and system configurations',
  keywords: 'client, admin, dashboard, management, users, settings',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ];

const breadcrumbItems = [
  {
    title: 'Home',
    url: '/',
    active: false,
  },
  {
    title: 'Admin',
    url: '/admin',
    active: false,
  },
  {
    title: 'Customers',
    url: '/admin/customers',
    active: true,
  },
];
export default function Page() {
  return <PageScreen title="Dashboard Client Admin" breadcrumbs={breadcrumbItems} />;
}
