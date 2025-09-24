import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';

export const metadata: Metadata = {
  title: 'Client Dashboard | Next Boilerplate',
  description: 'Client dashboard for managing users, settings, and system configurations',
  keywords: 'client, dashboard, management, users, settings',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ_PROFILE];
const breadcrumbItems = (clientId: string) => [
  {
    title: 'Home',
    url: '/',
    active: false,
  },
  {
    title: 'Dashboard',
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
  return <PageScreen title="Dashboard Client Admin" breadcrumbs={breadcrumbs}></PageScreen>;
}
