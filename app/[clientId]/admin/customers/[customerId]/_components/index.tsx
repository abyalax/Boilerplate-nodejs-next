'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { H1 } from '~/components/ui/typography';
import { useGetCustomer } from '../../_hooks/use-get-customer';

type Params = Awaited<PageProps<'/[clientId]/admin/customers/[customerId]/update'>['params']>;

export const Component: FC = () => {
  const { clientId, customerId } = useParams<Params>();
  const { data } = useGetCustomer(clientId, customerId);
  return (
    <div>
      <H1>Detail Customer</H1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};
