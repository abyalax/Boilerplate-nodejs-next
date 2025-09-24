import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';

export const permissions = [PERMISSIONS.CUSTOMER.UPDATE];

const breadcrumbItems = (clientId: string, customerId: string) => [
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
    active: false,
  },
  {
    title: 'Customer Clients',
    url: `/backoffice/clients/${clientId}/customers`,
    active: false,
  },
  {
    title: 'Customers Detail',
    url: `/backoffice/clients/${clientId}/customers/${customerId}`,
    active: true,
  },
];

type Props = PageProps<'/backoffice/clients/[clientId]/customers/[customerId]'>;

export default async function Page({ params }: Props) {
  const { customerId, clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId, customerId);

  return <PageScreen title="Customer Detail" breadcrumbs={breadcrumbs} />;
}
