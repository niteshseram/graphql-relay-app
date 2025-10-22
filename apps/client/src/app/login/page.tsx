'use client';
import { redirect } from 'next/navigation';
import SignIn from '~/components/auth/sign-in';
import { authClient } from '~/lib/auth-client';

export default function Home() {
  const { data: session } = authClient.useSession();

  if (session) {
    return redirect('/');
  }

  return (
    <div className="mx-auto max-w-md p-4 space-y-6">
      <h1 className="text-4xl">Login</h1>
      <SignIn />
    </div>
  );
}
