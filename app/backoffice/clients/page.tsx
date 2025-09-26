import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';
import { MetaRequest } from '~/common/types/meta';
import { PageScreen } from '~/components/layouts/page';
import { User } from '~/db/schema';
import { getQueryClient } from '~/lib/query/client';
import { Component } from './_components';
import { queryGetClients } from './_hooks/use-get-clients';

export const metadata: Metadata = {
  title: 'Admin Client Management | Admin Dashboard',
  description: 'Manage client accounts, roles, and permissions in the admin dashboard',
  keywords: 'clients, management, admin, roles, permissions',
};

export const permissions = [PERMISSIONS.CLIENT.READ];

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
    active: true,
  },
];

type Props = PageProps<'/backoffice/clients'>;

export default async function Page({ searchParams }: Props) {
  const querySearch = await searchParams;

  const query: MetaRequest<User> = {
    page: querySearch.page ? Number(querySearch.page) : 1,
    per_page: querySearch.per_page ? Number(querySearch.per_page) : 10,
    search: querySearch.search as string,
    sort_by: querySearch.sort_by as keyof User,
    sort_order: querySearch.order_by as 'ASC' | 'DESC',
  };

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(queryGetClients(query));

  return (
    <PageScreen title="Client Managements" breadcrumbs={breadcrumbItems}>
      <Component />
    </PageScreen>
  );
}
