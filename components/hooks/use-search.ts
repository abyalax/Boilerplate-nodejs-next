'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { z } from 'zod';

export function useSearch<TSchema extends z.ZodSchema>(schema: TSchema) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const raw: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    raw[key] = value;
  });

  // Try to parse with schema
  let parsed: z.core.output<TSchema>;
  let hasValidationError = false;

  try {
    parsed = schema.parse(raw);
  } catch (error) {
    // notice failed validation
    console.warn(error);
    // If validation fails, parse empty object to get defaults
    hasValidationError = true;
    parsed = schema.parse({});
  }

  useEffect(() => {
    // If validation failed, replace URL with defaults
    if (hasValidationError) {
      const newParams = new URLSearchParams();
      Object.entries(parsed as Record<string, string>).forEach(([key, value]) => {
        if (value !== undefined) {
          newParams.set(key, String(value));
        }
      });
      router.replace(`${pathname}?${newParams.toString()}`);
      return;
    }

    // Otherwise, check if we need to set any default values in URL
    const needsDefaults = Object.keys(parsed as Record<string, string>).some((key: string) => {
      return !searchParams.has(key) && (parsed as Record<string, string>)[key] !== undefined;
    });

    if (needsDefaults) {
      const newParams = new URLSearchParams(searchParams);

      // Add missing params with their default values
      Object.entries(parsed as Record<string, string>).forEach(([key, value]) => {
        if (!searchParams.has(key) && value !== undefined) {
          newParams.set(key, String(value));
        }
      });

      router.replace(`${pathname}?${newParams.toString()}`);
    }
  }, [searchParams, router, pathname, parsed, hasValidationError]);

  return parsed as z.core.output<TSchema>;
}
