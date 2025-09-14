import { Metadata } from 'next';
import PagecreateCustomer from './_components/page-create-user';
import { PERMISSIONS } from '~/common/const/permission';

export const metadata: Metadata = {
  title: 'Create User | Admin Dashboard',
  description: 'Add a new user and assign roles & permissions in the system.',
  keywords: ['create user', 'admin', 'dashboard', 'roles', 'permissions'],
  openGraph: {
    title: 'Create User - Admin Dashboard',
    description: 'Add a new user and assign roles & permissions in the system.',
    type: 'website',
    url: '/admin/users/create',
    images: [
      {
        url: '/og-image.png', // bisa diganti custom OG image
        width: 1200,
        height: 630,
        alt: 'Create User Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create User - Admin Dashboard',
    description: 'Add a new user and assign roles & permissions in the system.',
    images: ['/og-image.png'],
  },
};

export const permissions = [PERMISSIONS.CUSTOMER.CREATE];

export default function Page() {
  return <PagecreateCustomer />;
}
