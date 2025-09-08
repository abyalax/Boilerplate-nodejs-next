import z from 'zod';

const envSchema = z.object({
  BASE_URL: z.string().min(1, 'BASE_URL is required'),

  NEXT_PUBLIC_BASE_URL_API: z.string().min(1, 'NEXT_PUBLIC_BASE_URL_API is required'),

  DATABASE_NAME: z.string().min(1, 'DATABASE_NAME is required'),
  DATABASE_HOST: z.string().min(1, 'DATABASE_HOST is required'),
  DATABASE_PASSWORD: z.string().min(1, 'DATABASE_PASSWORD is required'),
  DATABASE_USER: z.string().min(1, 'DATABASE_USER is required'),
  DATABASE_PORT: z.coerce.number().default(3306),

  NEXT_SECRET: z.string().min(1, 'NEXT_SECRET is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),

  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),
});

export const env = envSchema.parse(process.env);
