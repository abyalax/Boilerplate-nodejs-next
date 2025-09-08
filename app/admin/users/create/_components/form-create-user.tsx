'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { useCreateUser } from '~/app/admin/users/_hooks/use-create-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormUser, userSchema } from '~/db/schema';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useForm } from 'react-hook-form';

export function FormCreateUser() {
  const { mutate: createUser } = useCreateUser();

  const form = useForm<FormUser>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      roleId: 2,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    // createUser({ email: data.email, name: data.name, password: data.password, roleId: data.roleId }, { onSuccess: () => form.reset() });
    createUser({ email: '', name: '', password: '', roleId: data.roleId }, { onSuccess: () => form.reset() });
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
              <Select onValueChange={(value) => field.onChange([parseInt(value), parseInt(value)])} value={field.value ? field.value.toString() : undefined}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select roles" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Admin</SelectItem>
                  <SelectItem value="2">User</SelectItem>
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
