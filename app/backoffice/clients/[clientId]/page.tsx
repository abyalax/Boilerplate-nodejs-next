import { PageAdminClient } from './_components/page-admin-client';

export const permissions = ['user:read'];

export default function Page() {
  return <PageAdminClient />;
}
