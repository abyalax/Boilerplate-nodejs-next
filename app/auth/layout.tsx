import { ReactNode } from 'react';

import { Navbar } from '~/components/ui/navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Next Boilerplate. All rights reserved.</p>
      </footer>
    </div>
  );
}
