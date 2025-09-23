"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

import { Table } from "~/components/fragments/table";
import { Button } from "~/components/ui/button";
import { H1 } from "~/components/ui/typography";

import { useGetClients } from "../_hooks/use-get-clients";

export const Component: FC = () => {
  const { data } = useGetClients();
  const { push } = useRouter();
  return (
    <div>
      <div className="flex justify-between">
        <H1>Clients</H1>
        <Button onClick={() => push("/backoffice/clients/create")}>
          Create New Client
        </Button>
      </div>

      <Table
        data={data}
        columns={[
          {
            header: "ID",
            accessorKey: "id",
          },
          {
            header: "Name",
            accessorKey: "name",
          },
          {
            header: "Email",
            accessorKey: "email",
          },
        ]}
        columnIds={["id", "name", "email"]}
        onClickRow={(_e, data) => console.log(data.original)}
        enableFeature={{
          search: {
            fieldSearchable: "name",
          },
          engineSide: "server_side",
          pagination: true,
        }}
      />
    </div>
  );
};
