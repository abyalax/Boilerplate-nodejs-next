'use client';

import clsx from 'clsx';

export function Input({ type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={clsx(
        // Layout & sizing
        'flex h-9 w-full min-w-0 rounded-md px-3 py-1 md:text-sm',
        // Border & background
        'border border-input bg-transparent dark:bg-input/30',
        // Typography
        'text-base file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground',
        // File input styling
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent',
        // State
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        // Effects
        'shadow-xs outline-none transition-[color,box-shadow]',
        'selection:bg-primary selection:text-primary-foreground',
      )}
      {...props}
    />
  );
}
