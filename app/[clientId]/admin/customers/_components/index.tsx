'use client';

import { useParams, useRouter } from 'next/navigation';
import { FC, Suspense } from 'react';
import { FallBack } from '~/components/fragments/fallback';
import { Button } from '~/components/ui/button';

import { H1 } from '~/components/ui/typography';
import { CustomersTable } from './customer-table';

export const Component: FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { push } = useRouter();

  return (
    <div>
      <div className="flex justify-between">
        <H1>Customers</H1>
        <Button onClick={() => push(`/${clientId}/admin/customers/create`)}>Create New Customer</Button>
      </div>

      <Suspense fallback={<FallBack />}>
        <CustomersTable />
      </Suspense>
    </div>
  );
};
