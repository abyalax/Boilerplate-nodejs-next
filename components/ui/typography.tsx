import { FC, PropsWithChildren } from 'react';

import { cn } from '~/lib/utils';

interface Props extends PropsWithChildren {
  className?: string;
}

export const H1: FC<Props> = ({ children, className }) => (
  <h1 className={cn('scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance', className)}>{children}</h1>
);

export const H2: FC<Props> = ({ children, className }) => (
  <h2 className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)}>{children}</h2>
);

export const H3: FC<Props> = ({ children, className }) => <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>{children}</h3>;

export const H4: FC<Props> = ({ children, className }) => <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>{children}</h4>;

export const P: FC<Props> = ({ children, className }) => <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>;

export const Large: FC<Props> = ({ children, className }) => <div className={cn('text-lg font-semibold', className)}>{children}</div>;

export const Small: FC<Props> = ({ children, className }) => <small className={cn('text-sm leading-none font-medium', className)}>{children}</small>;

export const Muted: FC<Props> = ({ children, className }) => <p className={cn(' text-muted-foreground text-sm', className)}>{children}</p>;
