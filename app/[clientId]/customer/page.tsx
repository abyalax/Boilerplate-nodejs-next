import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';

export const metadata: Metadata = {
  title: 'Client Dashboard | Next Boilerplate',
  description: 'Client dashboard for managing users, settings, and system configurations',
  keywords: 'client, dashboard, management, users, settings',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ_PROFILE];

const breadcrumbItems = [
  {
    title: 'Home',
    url: '/1/customer',
    active: true,
  },
  {
    title: 'Orders',
    url: '/1/customer/orders',
    active: false,
  },
  {
    title: 'Profile',
    url: '/1/customer/me/profile',
    active: false,
  },
];
export default function Page() {
  return <PageScreen title="Client Customer" breadcrumbs={breadcrumbItems} />;
}
