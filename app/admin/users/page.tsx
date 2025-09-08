import { PageUsers } from './_components/page-users';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Management | Admin Dashboard',
  description: 'Manage user accounts, roles, and permissions in the admin dashboard',
  keywords: 'users, management, admin, roles, permissions',
};

export const permissions = ['update:user'];

export default function Page() {
  return <PageUsers />;
}
