"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { CreateUser, userInsertSchema } from "~/db/schema";

import { useCreateCustomer } from "../_hooks/use-create-customer";

export function FormCreateCustomer() {
  const { clientId } = useParams<{ clientId: string }>();
  const { mutate: createCustomer } = useCreateCustomer(clientId);
  const form = useForm<CreateUser>({
    resolver: zodResolver(userInsertSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
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
                <Input
                  type="email"
                  placeholder="Enter email address"
                  {...field}
                />
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
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create Customer
        </Button>
      </form>
    </Form>
  );
}
