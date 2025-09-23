import { Metadata } from "next";

import { PERMISSIONS } from "~/common/const/permission";
import { PageScreen } from "~/components/layouts/page";

import { Component } from "./_components";

export const metadata: Metadata = {
  title: "Admin User Management | Admin Dashboard",
  description:
    "Manage user accounts, roles, and permissions in the admin dashboard",
  keywords: "users, management, admin, roles, permissions",
};

export const permissions = [
  PERMISSIONS.CUSTOMER.READ,
  PERMISSIONS.CUSTOMER.DELETE,
];
const breadcrumbItems = (clientId: string) => [
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
];

type Props = PageProps<"/[clientId]/admin/customers">;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return (
    <PageScreen title="Client Admin Customers" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
