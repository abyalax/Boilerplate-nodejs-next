import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';

export const metadata: Metadata = {
  title: 'Admin User Management | Admin Dashboard',
  description: 'Manage user accounts, roles, and permissions in the admin dashboard',
  keywords: 'users, management, admin, roles, permissions',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ, PERMISSIONS.CUSTOMER.DELETE];

const breadcrumbItems = (clientId: string) => [
  {
    title: 'Home',
    url: '/',
    active: false,
  },
  {
    title: 'Dashboard',
    url: '/backoffice',
    active: false,
  },
  {
    title: 'Client Managements',
    url: '/backoffice/clients',
    active: false,
  },
  {
    title: 'Client',
    url: `/backoffice/clients/${clientId}`,
    active: false,
  },
  {
    title: 'Customers',
    url: `/backoffice/clients/${clientId}/customers`,
    active: true,
  },
];

type Props = PageProps<'/backoffice/clients/[clientId]/customers'>;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return <PageScreen title="Customer List" breadcrumbs={breadcrumbs} />;
}
