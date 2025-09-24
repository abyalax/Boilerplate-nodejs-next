import z from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1, { message: 'Customer name is required' }),
  email: z.string().min(1, { message: 'Customer email is required' }),
  password: z.string().min(1, { message: 'Customer password is required' }),
});

export type FormDataCustomer = z.infer<typeof customerSchema>;
