import { CSSProperties, FC } from 'react';
import { cn } from '~/lib/utils';

interface FallbackProps {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  className?: string;
  style?: CSSProperties;
}

export const FallBack: FC<FallbackProps> = ({ width = '100%', height = '100%', className = '', style }) => {
  const containerStyle = {
    width,
    height,
    minHeight: height,
    ...style,
  };

  return (
    <div className={cn('flex items-center justify-center bg-background', className)} style={containerStyle}>
      <div className="flex flex-col items-center space-y-6">
        {/* Main Loading Spinner */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-muted animate-spin border-t-primary"></div>
          <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent animate-pulse border-t-brand-contrast opacity-40"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2 text-center">
          <h2 className="text-lg font-medium text-foreground">Loading</h2>
          <p className="text-sm text-muted-foreground">Please wait...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-foreground to-background animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
