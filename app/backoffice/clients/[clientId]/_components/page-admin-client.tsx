'use client';

import { useParams } from 'next/navigation';
import { useGetClientByID } from '../../_hooks/use-get-client-by-id';

export const PageAdminClient = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetClientByID({ id });
  return (
    <div>
      <h1>Detail User</h1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};
