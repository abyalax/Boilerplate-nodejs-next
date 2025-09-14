import { PERMISSIONS } from '~/common/const/permission';
import { PageClientUsers } from './_components/page-admin-users';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin User Management | Admin Dashboard',
  description: 'Manage user accounts, roles, and permissions in the admin dashboard',
  keywords: 'users, management, admin, roles, permissions',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ, PERMISSIONS.CUSTOMER.DELETE];

export default function Page() {
  return <PageClientUsers />;
}
