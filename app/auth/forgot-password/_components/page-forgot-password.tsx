'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

import { FormForgotPassword } from './form-forgot-password';

export const PageForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">Enter your email to get link reset password</CardDescription>
        </CardHeader>
        <CardContent>
          <FormForgotPassword />
        </CardContent>
      </Card>
    </div>
  );
};
