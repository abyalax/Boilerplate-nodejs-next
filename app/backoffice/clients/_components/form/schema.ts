import z from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1, { message: 'Client name is required' }),
  email: z.string().min(1, { message: 'Client email is required' }),
  password: z.string().min(1, { message: 'Client password is required' }),
});

export type FormDataClient = z.infer<typeof clientSchema>;
