import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { Component } from './_components';

export const permissions = [PERMISSIONS.CUSTOMER.READ];

const breadcrumbItems = (clientId: string, customerId: string) => [
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
    title: 'Customers Profile',
    url: `/${clientId}/admin/customers/${customerId}`,
    active: true,
  },
];

type Props = PageProps<'/[clientId]/admin/customers/[customerId]'>;

export default async function Page({ params }: Props) {
  const { customerId, clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId, customerId);

  return (
    <PageScreen title="Customer Detail" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
