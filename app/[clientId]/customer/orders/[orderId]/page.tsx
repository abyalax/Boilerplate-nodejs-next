import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';

export const metadata: Metadata = {
  title: 'Client Order ID | Next Boilerplate',
  description: 'Client Order for management, settings, and system configurations',
  keywords: 'client, Order, management, users, settings',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ];

export default function Page() {
  return <div>OrderId Page</div>;
}
