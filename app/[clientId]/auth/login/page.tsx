import { Metadata } from 'next';

import { PageLogin } from './_components/page-login';

export const metadata: Metadata = {
  title: 'Login | Next Boilerplate',
  description: 'Secure login to access your account and manage your preferences',
  keywords: 'login, sign in, authentication, secure access',
};

export default function Page() {
  return <PageLogin />;
}
