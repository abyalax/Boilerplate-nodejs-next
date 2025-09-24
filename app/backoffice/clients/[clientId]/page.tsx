import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { getQueryClient } from '~/lib/query/client';
import { queryGetClientByID } from '../_hooks/use-get-client-by-id';
import { Component } from './_components';

export const permissions = [PERMISSIONS.CLIENT.READ];

const breadcrumbItems = (clientId: string) => [
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
    title: 'Client',
    url: `/backoffice/clients/${clientId}`,
    active: true,
  },
];

type Props = PageProps<'/backoffice/clients/[clientId]'>;

export default async function Page({ params }: Props) {
  const queryClient = getQueryClient();
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  void queryClient.prefetchQuery(queryGetClientByID(clientId));
  return (
    <PageScreen title="Client Information" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
