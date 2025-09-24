import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { MetaRequest } from '~/common/types/meta';
import { PageScreen } from '~/components/layouts/page';
import { User } from '~/db/schema';
import { getQueryClient } from '~/lib/query/client';
import { Component } from './_components';
import { queryGetCustomers } from './_hooks/use-get-customers';

export const metadata: Metadata = {
  title: 'Admin User Management | Admin Dashboard',
  description: 'Manage user accounts, roles, and permissions in the admin dashboard',
  keywords: 'users, management, admin, roles, permissions',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ, PERMISSIONS.CUSTOMER.DELETE];
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
    active: true,
  },
];

type Props = PageProps<'/[clientId]/admin/customers'>;

export default async function Page({ params, searchParams }: Props) {
  const querySearch = await searchParams;

  const query: MetaRequest<User> = {
    page: querySearch.page ? Number(querySearch.page) : 1,
    per_page: querySearch.per_page ? Number(querySearch.per_page) : 10,
    search: querySearch.search as string,
    sort_by: querySearch.sort_by as keyof User,
    sort_order: querySearch.order_by as 'ASC' | 'DESC',
  };

  const { clientId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(queryGetCustomers(clientId, query));
  const breadcrumbs = breadcrumbItems(clientId);

  return (
    <PageScreen title="Customer Managements" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
