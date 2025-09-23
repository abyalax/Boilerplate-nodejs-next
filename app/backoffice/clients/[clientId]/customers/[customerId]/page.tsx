import { PERMISSIONS } from "~/common/const/permission";
import { PageScreen } from "~/components/layouts/page";

export const permissions = [PERMISSIONS.CUSTOMER.UPDATE];

const breadcrumbItems = (clientId: string, customerId: string) => [
  {
    title: "Home",
    url: "/",
    active: false,
  },
  {
    title: "Admin",
    url: `/${clientId}/admin`,
    active: false,
  },
  {
    title: "Customers",
    url: `/${clientId}/admin/customers`,
    active: false,
  },
  {
    title: "Customers Detail",
    url: `/${clientId}/admin/customers/${customerId}`,
    active: true,
  },
];

type Props = PageProps<"/backoffice/clients/[clientId]/customers/[customerId]">;

export default async function Page({ params }: Props) {
  const { customerId, clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId, customerId);

  return <PageScreen title="Customer Detail" breadcrumbs={breadcrumbs} />;
}
