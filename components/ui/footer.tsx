import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="border-t py-6 text-center text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Abya&apos;s SaaS - All rights reserved.</p>
    </footer>
  );
};
