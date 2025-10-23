'use client';

import { type FormEvent, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { authClient } from '~/lib/auth-client';

export default function SignIn() {
  const [email, setEmail] = useState('admin@nakazawa.dev');
  const [password, setPassword] = useState('not-a-secure-password');

  async function signIn(event: FormEvent) {
    event.preventDefault();

    await authClient.signIn.email({
      email,
      password,
      callbackURL: '/',
    });
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={signIn}>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        type="email"
        value={email}
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        type="password"
        value={password}
      />
      <Button variant="default" type="submit" className="mt-3">
        Sign In
      </Button>
    </form>
  );
}
