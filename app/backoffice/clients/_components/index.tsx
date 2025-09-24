'use client';

import { useRouter } from 'next/navigation';
import { FC, Suspense } from 'react';
import { FallBack } from '~/components/fragments/fallback';
import { Button } from '~/components/ui/button';
import { H1 } from '~/components/ui/typography';
import { ClientsTable } from './client-table';

export const Component: FC = () => {
  const { push } = useRouter();

  return (
    <div>
      <div className="flex justify-between">
        <H1>Clients</H1>
        <Button onClick={() => push('/backoffice/clients/create')}>Create New Client</Button>
      </div>

      <Suspense fallback={<FallBack />}>
        <ClientsTable />
      </Suspense>
    </div>
  );
};
