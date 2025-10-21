'use client';

import { type FormEvent, useState } from 'react';
import { authClient } from '../../lib/auth-client';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signIn(event: FormEvent){
    event.preventDefault();

    await authClient.signIn.email({
      email,
      password,
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-bold text-lg">Sign In</h2>
      <form className="flex flex-col gap-1" onSubmit={signIn}>
        <input
          className="rounded-sm border-1 border-pink-500 p-2 font-mono text-pink-500 dark:border-pink-400 dark:text-pink-400"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          type="email"
          value={email}
        />
        <input
          className="rounded-sm border-1 border-pink-500 p-2 font-mono text-pink-500 dark:border-pink-400 dark:text-pink-400"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          value={password}
        />
        <button
          className="rounded-sm border-1 border-pink-500 p-2 font-mono text-pink-500 dark:border-pink-400 dark:text-pink-400"
          type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}
