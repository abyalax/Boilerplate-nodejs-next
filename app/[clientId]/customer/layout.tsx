import { Navbar } from '~/components/ui/navbar';
import { ReactNode } from 'react';
import { navigationCustomer } from '../../navigation';

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ clientId: string }> }) {
  const { clientId } = await params;
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navigation={navigationCustomer(clientId)} />
      {children}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Next Boilerplate. All rights reserved.</p>
      </footer>
    </div>
  );
}
