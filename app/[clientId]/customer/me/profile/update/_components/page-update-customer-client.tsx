'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card';
import { FormUpdateCustomerClient } from './form-update-customer-client';

export const PageUpdateCustomerClient = () => {
  return (
    <div className="container mx-auto max-w-2xl py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Update Customer</h1>
        <p className="text-muted-foreground text-sm">Fill out the form below to add a new user with roles and permissions.</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <CardDescription>Please provide basic details for the new user.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormUpdateCustomerClient />
        </CardContent>
      </Card>
    </div>
  );
};
