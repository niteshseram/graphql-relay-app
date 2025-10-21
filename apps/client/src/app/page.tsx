'use client';

import SignIn from '../components/auth/sign-in';
import { SignOutButton } from '../components/auth/sign-out-button';
import { authClient } from '../lib/auth-client';

export default function Home() {
  const { data: session 
    
  } = authClient.useSession();

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="text-4xl">Welcome</h1>
      <p className="my-4">
        <em>Minimal, fast, sensible defaults</em>
      </p>
      <div>
        {session ? (
          <div className="flex flex-col items-center gap-4">
            <div>Hello, {session.user.name}</div>
            <div>
              <SignOutButton />
            </div>
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  );
}
