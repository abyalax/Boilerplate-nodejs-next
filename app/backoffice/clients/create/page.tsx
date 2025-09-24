import { Metadata } from 'next';

import { PageScreen } from '~/components/layouts/page';

import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Create Customer | Admin Dashboard',
  description: 'Add a new Customer and assign roles & permissions in the system.',
  keywords: ['create Customer', 'admin', 'dashboard', 'roles', 'permissions'],
  openGraph: {
    title: 'Create Customer - Admin Dashboard',
    description: 'Add a new Customer and assign roles & permissions in the system.',
    type: 'website',
    url: '/admin/Customer/create',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Create Customer Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Customer - Admin Dashboard',
    description: 'Add a new Customer and assign roles & permissions in the system.',
    images: ['/og-image.png'],
  },
};

const breadcrumbItems = [
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
    title: 'Create Client',
    url: '/backoffice/clients/create',
    active: true,
  },
];

export default function Page() {
  return (
    <PageScreen title="Create Client" breadcrumbs={breadcrumbItems}>
      <Component />
    </PageScreen>
  );
}
