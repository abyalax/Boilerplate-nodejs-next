import { Metadata } from 'next';
import { FormLogin } from './_components/form-login';

export const metadata: Metadata = {
  title: 'Login | Next Boilerplate',
  description: 'Secure login to access your account and manage your preferences',
  keywords: 'login, sign in, authentication, secure access',
};

export default function Page() {
  return (
    <div className="flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 space-y-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Login to your account</h2>
          <p className="text-muted-foreground mt-2">Enter your credentials to continue</p>
        </div>
        <FormLogin />
      </div>
    </div>
  );
}
