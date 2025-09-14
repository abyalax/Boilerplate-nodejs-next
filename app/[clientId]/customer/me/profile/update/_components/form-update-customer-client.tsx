'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { useCreateClient } from '~/app/backoffice/clients/_hooks/use-create-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~/components/ui/button';
import { userInsertSchema } from '~/db/schema';
import { Input } from '~/components/ui/input';
import { useForm } from 'react-hook-form';

export function FormUpdateCustomerClient() {
  const { mutate: createCustomer } = useCreateClient();

  const form = useForm({
    resolver: zodResolver(userInsertSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      roleId: 1,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    createCustomer(data, { onSuccess: () => form.reset() });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roles</FormLabel>
              <Select {...field} onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select roles" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">User</SelectItem>
                  <SelectItem value="2">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create User
        </Button>
      </form>
    </Form>
  );
}
