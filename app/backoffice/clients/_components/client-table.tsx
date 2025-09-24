"use client";

import { useSearchParams } from "next/navigation";
import { Table } from "~/components/fragments/table";
import { useColumns } from "../_hooks/use-columns";
import { useGetClients } from "../_hooks/use-get-clients";

export const ClientsTable = () => {
  const params = useSearchParams();
  const { data } = useGetClients({
    page: Number(params.get("page")) ?? 1,
    per_page: Number(params.get("per_page")) ?? 10,
  });

  const { columns, columnIds, initialColumnVisibility } = useColumns({
    defaultVisible: ["select", "id", "email", "name", "action"],
  });
  return (
    <Table
      data={data}
      columns={columns}
      columnIds={columnIds}
      onClickRow={(data) => console.log(data.original)}
      enableFeature={{
        search: {
          fieldSearchable: "name",
        },
        columnVisibilitySelector: {
          initialColumnVisibility,
        },
        engineSide: "server_side",
        pagination: {
          perPageOptions: [5, 10, 20, 30, 40, 50, 100],
        },
      }}
    />
  );
};
