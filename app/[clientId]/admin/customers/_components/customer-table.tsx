'use client';

import { useParams } from 'next/navigation';
import { metaRequestSchema } from '~/common/types/meta';
import { Table } from '~/components/fragments/table';
import { useSearch } from '~/components/hooks/use-search';
import { useColumns } from '../_hooks/use-columns';
import { useGetCustomers } from '../_hooks/use-get-customers';

export const CustomersTable = () => {
  const search = useSearch(metaRequestSchema);

  const { clientId } = useParams<{ clientId: string }>();

  const { data } = useGetCustomers(clientId, {
    page: Number(search.page ?? 1),
    per_page: Number(search.per_page ?? 10),
    search: search.search as string,
  });

  const { columns, columnIds, initialColumnVisibility } = useColumns({
    defaultVisible: ['select', 'id', 'email', 'name', 'action'],
  });

  return (
    <Table
      data={data}
      columns={columns}
      columnIds={columnIds}
      onClickRow={(data) => console.log(data.original)}
      enableFeature={{
        search: {
          fieldSearchable: 'name',
        },
        columnVisibilitySelector: {
          initialColumnVisibility,
        },
        engineSide: 'server_side',
        pagination: {
          perPageOptions: [5, 10, 20, 30, 40, 50, 100],
        },
      }}
    />
  );
};
