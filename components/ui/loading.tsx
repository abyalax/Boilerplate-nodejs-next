import { cn } from '~/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
  xl: 'w-12 h-12 border-4',
};

export function Loading({ size = 'xl', className }: LoadingProps) {
  const sizeClasses = sizeMap[size];

  return (
    <div className={cn('relative', className)}>
      {/* Main spinner - dengan border yang lebih kontras */}
      <div
        className={cn(sizeClasses, 'rounded-full animate-spin', 'border-border/30 border-t-primary', 'dark:border-muted-foreground/20 dark:border-t-primary')}
      ></div>

      {/* Secondary glow effect */}
      <div
        className={cn(
          sizeClasses,
          'absolute inset-0 rounded-full animate-pulse',
          'border-transparent border-t-brand-contrast/60',
          'dark:border-t-blue-light/80',
        )}
      ></div>

      {/* Inner highlight untuk depth */}
      <div
        className={cn(
          sizeClasses.replace(/border-\d/, 'border-1'),
          'absolute inset-1 rounded-full animate-spin',
          'border-transparent border-t-accent/40 opacity-60',
          'dark:border-t-white/20',
        )}
        style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
      ></div>
    </div>
  );
}
