'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card';
import { FormcreateCustomer } from './form-create-user';

export default function PagecreateCustomer() {
  return (
    <div className="container mx-auto max-w-2xl py-10">
      {/* Judul halaman */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Create New User</h1>
        <p className="text-muted-foreground text-sm">Fill out the form below to add a new user with roles and permissions.</p>
      </div>

      {/* Card form */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Please provide basic details for the new user.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormcreateCustomer />
        </CardContent>
      </Card>
    </div>
  );
}
