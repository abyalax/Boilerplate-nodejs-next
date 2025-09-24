'use client';

import { FC } from 'react';

import { ROLEIDS } from '~/common/const/permission';
import { Flex } from '~/components/layouts/flex';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

import { FormClient } from '../../_components/form';
import { FormDataClient } from '../../_components/form/schema';
import { useCreateClient } from '../../_hooks/use-create-client';

export const Component: FC = () => {
  const { mutate, isPending } = useCreateClient();

  const handleSubmit = (data: FormDataClient) => {
    mutate({
      ...data,
      roleId: ROLEIDS['Client Admin'],
    });
  };

  return (
    <Flex className="flex-1 items-center justify-center">
      <Card className="shadow-md lg:max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
          <CardDescription>Please provide basic details for the new client.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormClient onSubmit={handleSubmit} buttonText="Create Client" isLoading={isPending} />
        </CardContent>
      </Card>
    </Flex>
  );
};
