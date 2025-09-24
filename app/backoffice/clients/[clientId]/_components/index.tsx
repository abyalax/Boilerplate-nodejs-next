'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { H1 } from '~/components/ui/typography';
import { useGetClientByID } from '../../_hooks/use-get-client-by-id';

export const Component: FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { data } = useGetClientByID(clientId);
  return (
    <div>
      <H1>Detail User</H1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};
