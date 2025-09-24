'use client';

import { useTheme } from 'next-themes';
import { ComponentProps, FC } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

import { useMounted } from '~/components/hooks/use-mounted';
import { cn } from '~/lib/utils';

export const ToggleTheme: FC<ComponentProps<'button'>> = ({ className, ...rest }) => {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  if (!mounted) return null;
  return (
    <button
      {...rest}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      id="theme-toggle"
      className={cn('p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors', className)}
    >
      {theme === 'dark' ? <FaMoon /> : <FaSun />}
    </button>
  );
};
