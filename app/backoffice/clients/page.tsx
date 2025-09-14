import { PERMISSIONS } from '~/common/const/permission';
import { PageAdminClients } from './_components/page-admin-clients';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Client Management | Admin Dashboard',
  description: 'Manage client accounts, roles, and permissions in the admin dashboard',
  keywords: 'clients, management, admin, roles, permissions',
};

export const permissions = [PERMISSIONS.CLIENT.READ];

export default function Page() {
  return <PageAdminClients />;
}
