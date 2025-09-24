import { Metadata } from "next";
import { PERMISSIONS } from "~/common/const/permission";
import { PageScreen } from "~/components/layouts/page";
import { getQueryClient } from "~/lib/query/client";
import { Component } from "./_components";
import { queryGetClients } from "./_hooks/use-get-clients";

export const metadata: Metadata = {
  title: "Admin Client Management | Admin Dashboard",
  description:
    "Manage client accounts, roles, and permissions in the admin dashboard",
  keywords: "clients, management, admin, roles, permissions",
};

export const permissions = [PERMISSIONS.CLIENT.READ];

const breadcrumbItems = [
  {
    title: "Home",
    url: "/",
    active: false,
  },
  {
    title: "Dashboard",
    url: "/backoffice",
    active: false,
  },
  {
    title: "Client Managements",
    url: "/backoffice/clients",
    active: true,
  },
];

type Props = PageProps<"/backoffice/clients">;

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(queryGetClients(params));

  return (
    <PageScreen title="Client Managements" breadcrumbs={breadcrumbItems}>
      <Component />
    </PageScreen>
  );
}
