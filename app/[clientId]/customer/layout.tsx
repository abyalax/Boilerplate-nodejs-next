import { ReactNode } from 'react';

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ clientId: string }> }) {
  const { clientId } = await params;
  console.log('clientId: ', clientId);

  return <div className="min-h-screen flex flex-col">{children}</div>;
}
