import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Next Boilerplate',
  description: 'Administrative dashboard for managing users, settings, and system configurations',
  keywords: 'admin, dashboard, management, users, settings',
};

export const permissions = [PERMISSIONS.CLIENT.READ];

const breadcrumbItems = [
  {
    title: 'Home',
    url: '/',
    active: false,
  },
  {
    title: 'Dashboard',
    url: '/backoffice',
    active: true,
  },
  {
    title: 'Client Managements',
    url: '/backoffice/clients',
    active: false,
  },
  {
    title: 'Create Client',
    url: '/backoffice/clients/create',
    active: false,
  },
];
export default function Page() {
  return <PageScreen title="Backoffice System Admin" breadcrumbs={breadcrumbItems} />;
}
