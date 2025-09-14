'use client';

import { useParams } from 'next/navigation';
import { useGetCustomerByID } from '../../_hooks/use-get-user-by-id';

export const PageClientUser = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCustomerByID({ id });
  return (
    <div>
      <h1>Detail User</h1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};
