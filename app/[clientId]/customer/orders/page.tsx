import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';
import { PageClientOrders } from './_components/page-orders';

export const metadata: Metadata = {
  title: 'Client Orders | Next Boilerplate',
  description: 'Client Orders for management, settings, and system configurations',
  keywords: 'client, Orders, management, users, settings',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ];

export default function Page() {
  return <PageClientOrders />;
}
