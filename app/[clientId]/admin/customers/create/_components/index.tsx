'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { ROLEIDS } from '~/common/const/permission';
import { Flex } from '~/components/layouts/flex';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { FormCustomer } from '../../_components/form';
import { FormDataCustomer } from '../../_components/form/schema';
import { useCreateCustomer } from '../../_hooks/use-create-customer';

export const Component: FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { mutate, isPending } = useCreateCustomer(clientId);

  const handleSubmit = (data: FormDataCustomer) => {
    console.log({
      ...data,
      roleId: ROLEIDS['Customer'],
    });
    mutate({
      ...data,
      roleId: ROLEIDS['Customer'],
    });
  };

  return (
    <Flex className="flex-1 items-center justify-center">
      <Card className="shadow-md lg:max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <CardDescription>Please provide basic details for the new customer.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormCustomer onSubmit={handleSubmit} buttonText="Create Customer" isLoading={isPending} />
        </CardContent>
      </Card>
    </Flex>
  );
};
