import { PropsWithChildren } from 'react';

import { Footer } from '~/components/ui/footer';
import { SidebarProvider } from '~/components/ui/sidebar';

import { AppSidebar } from '../_components/ui/app-sidebar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main style={{ width: '100%' }}>
        {children}
        <Footer />
      </main>
    </SidebarProvider>
  );
}
