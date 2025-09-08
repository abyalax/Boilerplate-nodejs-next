'use client';

import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useMounted } from '~/components/hooks/use-mounted';

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  if (!mounted) return null;
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      id="theme-toggle"
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {theme === 'dark' ? <FaMoon /> : <FaSun />}
    </button>
  );
}
