'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type Params = Record<string, string | number | null | undefined>;
export type Updater<T> = T | ((_prev: T) => T);

export interface NavigateOptions<T = Params> {
  replace?: boolean;
  search?: Updater<T>;
  viewTransition?: boolean;
}

type ParamFunc = (_prev: Params) => Params;
export function useNavigate<T extends Params = Params>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return ({ replace = false, search, viewTransition = false }: NavigateOptions<T>) => {
    // Snapshot current params
    const current: Params = {};
    searchParams.forEach((value, key) => {
      current[key] = value;
    });

    // Resolve updater
    const nextSearch = typeof search === 'function' ? (search as unknown as ParamFunc)(current) : { ...current, ...search };

    // Build query
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(nextSearch)) {
      if (value == null) continue;
      params.set(key, String(value));
    }

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    const navigateFn = replace ? router.replace : router.push;

    if (viewTransition && 'startViewTransition' in document) {
      document.startViewTransition(() => navigateFn(url));
    } else {
      navigateFn(url);
    }
  };
}
