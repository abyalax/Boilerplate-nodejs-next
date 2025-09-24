import { Metadata } from 'next';

import { PageScreen } from '~/components/layouts/page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

import { FormUpdateCustomerClient } from './_components/form-update-customer-client';

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
    url: `/${clientId}/customer`,
    active: false,
  },
  {
    title: 'Orders',
    url: `/${clientId}/customer/orders`,
    active: true,
  },
  {
    title: 'Profile',
    url: `/${clientId}/customer/me/profile`,
    active: false,
  },
  {
    title: 'Update',
    url: `/${clientId}/customer/me/profile/update`,
    active: true,
  },
];

type Props = PageProps<'/[clientId]/customer/me/profile/update'>;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return (
    <PageScreen title="Customer Management" breadcrumbs={breadcrumbs}>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <CardDescription>Please provide basic details for the new user.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormUpdateCustomerClient />
        </CardContent>
      </Card>
    </PageScreen>
  );
}
