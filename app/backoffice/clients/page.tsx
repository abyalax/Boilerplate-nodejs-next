import { Metadata } from "next";

import { PERMISSIONS } from "~/common/const/permission";
import { PageScreen } from "~/components/layouts/page";

import { Component } from "./_components";

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

export default function Page() {
  return (
    <PageScreen title="Client Managements" breadcrumbs={breadcrumbItems}>
      <Component />
    </PageScreen>
  );
}
