import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';

export const metadata: Metadata = {
  title: 'Client Customer Orders | Next Boilerplate',
  description: 'Client Customer Orders for management, settings, and system configurations',
  keywords: 'client Customer, Orders, management, users, settings',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ];

const breadcrumbItems = [
  {
    title: 'Home',
    url: '/1/customer',
    active: false,
  },
  {
    title: 'Orders',
    url: '/1/customer/orders',
    active: true,
  },
  {
    title: 'Profile',
    url: '/1/customer/me',
    active: false,
  },
];
export default function Page() {
  return <PageScreen title="Customer Orders" breadcrumbs={breadcrumbItems} />;
}
