import { Metadata } from "next";

import { PERMISSIONS } from "~/common/const/permission";
import { PageScreen } from "~/components/layouts/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { FormCreateCustomer } from "./_components/form-create-customer";

export const metadata: Metadata = {
  title: "Create User | Admin Dashboard",
  description: "Add a new user and assign roles & permissions in the system.",
  keywords: ["create user", "admin", "dashboard", "roles", "permissions"],
  openGraph: {
    title: "Create User - Admin Dashboard",
    description: "Add a new user and assign roles & permissions in the system.",
    type: "website",
    url: "/admin/users/create",
    images: [
      {
        url: "/og-image.png", // bisa diganti custom OG image
        width: 1200,
        height: 630,
        alt: "Create User Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create User - Admin Dashboard",
    description: "Add a new user and assign roles & permissions in the system.",
    images: ["/og-image.png"],
  },
};

export const permissions = [PERMISSIONS.CUSTOMER.CREATE];

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
  {
    title: "Create Customers",
    url: `/${clientId}/admin/customers/create`,
    active: true,
  },
];

type Props = PageProps<"/[clientId]/admin/customers/create">;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return (
    <PageScreen title="Create Customer" breadcrumbs={breadcrumbs}>
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <CardDescription>
            Please provide basic details for the new customer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormCreateCustomer />
        </CardContent>
      </Card>
    </PageScreen>
  );
}
