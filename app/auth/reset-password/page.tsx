import { PageResetPassword } from './_components/page-reset-password';

export const permissions = [];

export default async function Page({ searchParams }: { searchParams: Promise<{ token: string }> }) {
  const { token } = await searchParams;
  return <PageResetPassword token={token} />;
}
