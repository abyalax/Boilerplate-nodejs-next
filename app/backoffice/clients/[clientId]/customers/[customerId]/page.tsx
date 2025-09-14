import { PERMISSIONS } from '~/common/const/permission';
import { PageClientUser } from './_components/page-admin-user';

export const permissions = [PERMISSIONS.CUSTOMER.UPDATE];

export default function Page() {
  return <PageClientUser />;
}
