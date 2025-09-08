import { PageAdminUser } from './_components/page-admin-user';

export const permissions = ['delete:user'];

export default function Page() {
  return <PageAdminUser />;
}
