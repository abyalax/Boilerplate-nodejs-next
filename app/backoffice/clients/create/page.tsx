import { Metadata } from 'next';
import { PageCreateClient } from './_components/page-create-client';

export const metadata: Metadata = {
  title: 'Create client | Admin Dashboard',
  description: 'Add a new client and assign roles & permissions in the system.',
  keywords: ['create client', 'admin', 'dashboard', 'roles', 'permissions'],
  openGraph: {
    title: 'Create client - Admin Dashboard',
    description: 'Add a new client and assign roles & permissions in the system.',
    type: 'website',
    url: '/admin/client/create',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Create Client Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Client - Admin Dashboard',
    description: 'Add a new client and assign roles & permissions in the system.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <PageCreateClient />;
}
