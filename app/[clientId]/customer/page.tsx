import { Metadata } from 'next';
import { PageClientCustomer } from './_components/page-client-customer';
import { PERMISSIONS } from '~/common/const/permission';

export const metadata: Metadata = {
  title: 'Client Dashboard | Next Boilerplate',
  description: 'Client dashboard for managing users, settings, and system configurations',
  keywords: 'client, dashboard, management, users, settings',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ];

export default function Page() {
  return <PageClientCustomer />;
}
