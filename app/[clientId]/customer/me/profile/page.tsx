import { Metadata } from 'next';
import { PageCustomerClient } from './_components/page-customer-client';
import { PERMISSIONS } from '~/common/const/permission';

export const metadata: Metadata = {
  title: 'Customer Profile | Next Boilerplate',
  description: 'Customer Profile for managing profile, settings, and system configurations',
  keywords: 'admin, Profile, management, profile, settings',
};

export const permissions = [PERMISSIONS.CUSTOMER.READ_PROFILE];

export default function Page() {
  return <PageCustomerClient />;
}
