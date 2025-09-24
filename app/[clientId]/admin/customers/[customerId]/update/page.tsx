import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { getQueryClient } from '~/lib/query/client';
import { queryGetCustomer } from '../../_hooks/use-get-customer';
import { Component } from './_components';

export const permissions = [PERMISSIONS.CUSTOMER.UPDATE];

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
    active: false,
  },
  {
    title: 'Update Customers',
    url: `/${clientId}/admin/customers/${customerId}/update`,
    active: true,
  },
];

type Props = PageProps<'/[clientId]/admin/customers/[customerId]/update'>;

export default async function Page({ params }: Props) {
  const queryClient = getQueryClient();
  const { customerId, clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId, customerId);

  void queryClient.prefetchQuery(queryGetCustomer(clientId, customerId));

  return (
    <PageScreen title="Update Customer" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
