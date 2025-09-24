import { Metadata } from 'next';

import { PageScreen } from '~/components/layouts/page';
import { Component } from './_components';

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

const breadcrumbItems = (clientId: string) => [
  {
    title: 'Home',
    url: '/',
    active: false,
  },
  {
    title: 'Admin',
    url: `/${clientId}/admin`,
    active: false,
  },
  {
    title: 'Customers',
    url: `/${clientId}/admin/customers`,
    active: false,
  },
  {
    title: 'Create Customers',
    url: `/${clientId}/admin/customers/create`,
    active: true,
  },
];

type Props = PageProps<'/[clientId]/admin/customers/create'>;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);

  return (
    <PageScreen title="Create Customer" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
