import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';

export const metadata: Metadata = {
  title: 'Customer Profile | Next Boilerplate',
  description: 'Customer Profile for managing profile, settings, and system configurations',
  keywords: 'admin, Profile, management, profile, settings',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ_PROFILE];

const breadcrumbItems = (clientId: string) => [
  {
    title: 'Home',
    url: `/${clientId}/customer`,
    active: false,
  },
  {
    title: 'Orders',
    url: `/${clientId}/customer/orders`,
    active: false,
  },
  {
    title: 'Profile',
    url: `/${clientId}/customer/me/profile`,
    active: true,
  },
];

type Props = PageProps<'/[clientId]/customer/me/profile'>;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return <PageScreen title="Customer Profile" breadcrumbs={breadcrumbs} />;
}
