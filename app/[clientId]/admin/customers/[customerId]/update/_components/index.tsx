'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { ROLEIDS } from '~/common/const/permission';
import { Flex } from '~/components/layouts/flex';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { FormCustomer } from '../../../_components/form';
import { FormDataCustomer } from '../../../_components/form/schema';
import { useGetCustomer } from '../../../_hooks/use-get-customer';
import { useUpdateCustomer } from '../../../_hooks/use-update-customer';

type Params = Awaited<PageProps<'/[clientId]/admin/customers/[customerId]/update'>['params']>;

export const Component: FC = () => {
  const { clientId, customerId } = useParams<Params>();
  const { mutate, isPending } = useUpdateCustomer(clientId, customerId);
  const { data } = useGetCustomer(clientId, customerId);
  const handleSubmit = (data: FormDataCustomer) => {
    mutate({
      ...data,
      roleId: ROLEIDS['Customer'],
    });
  };

  const initialValues = data && { name: data.name, email: data.email, password: '' };

  return (
    <Flex className="flex-1 items-center justify-center">
      <Card className="shadow-md lg:max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <CardDescription>Please provide details data for the new customer.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormCustomer onSubmit={handleSubmit} buttonText="Update Customer" initialValues={initialValues} isLoading={isPending} />
        </CardContent>
      </Card>
    </Flex>
  );
};
