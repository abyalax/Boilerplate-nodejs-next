'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';

import { useForgotPassword } from '../../_hooks/use-forgot-password';

export const FormForgotPassword = () => {
  const { mutate: forgotPassword } = useForgotPassword();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.email(),
      }),
    ),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    forgotPassword(data);
  });

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Send Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
};
