import { PERMISSIONS } from "~/common/const/permission";
import { PageScreen } from "~/components/layouts/page";

export const permissions = [PERMISSIONS.CLIENT.READ];

const breadcrumbItems = (clientId: string) => [
  {
    title: "Home",
    url: "/",
    active: false,
  },
  {
    title: "Dashboard",
    url: `/backoffice`,
    active: false,
  },
  {
    title: "Client",
    url: `/backoffice/clients/${clientId}`,
    active: true,
  },
];

type Props = PageProps<"/backoffice/clients/[clientId]">;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return <PageScreen title="Home Client Admin" breadcrumbs={breadcrumbs} />;
}
