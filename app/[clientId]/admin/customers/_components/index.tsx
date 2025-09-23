"use client";

import { FC } from "react";

import { H1 } from "~/components/ui/typography";

export const Component: FC = () => {
  // const { data } = useGetClients();
  return (
    <pre>
      <H1>Customers</H1>
      {/* <code>{JSON.stringify(data, null, 2)}</code> */}
    </pre>
  );
};
