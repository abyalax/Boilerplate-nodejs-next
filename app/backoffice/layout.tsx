import { ReactNode } from 'react';

import { Footer } from '~/components/ui/footer';
import { SidebarProvider } from '~/components/ui/sidebar';

import { AppSidebar } from '../_components/ui/app-sidebar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main style={{ width: '100%' }}>
        <section className="min-h-[90vh]">{children}</section>
        <Footer />
      </main>
    </SidebarProvider>
  );
}
