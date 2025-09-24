import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';

export const metadata: Metadata = {
  title: 'Client Admin Dashboard | Next Boilerplate',
  description: 'Client Admin dashboard for managing users, settings, and system configurations',
  keywords: 'client, admin, dashboard, management, users, settings',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ];

const breadcrumbItems = (clientId: string) => [
  {
    title: 'Home',
    url: '/',
    active: false,
  },
  {
    title: 'Admin',
    url: `/${clientId}/admin`,
    active: true,
  },
  {
    title: 'Customers',
    url: `/${clientId}/admin/customers`,
    active: false,
  },
];

type Props = PageProps<'/[clientId]/admin'>;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);

  return <PageScreen title="Dashboard Client Admin" breadcrumbs={breadcrumbs} />;
}
