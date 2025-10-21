'use client';

import { authClient } from '../../lib/auth-client';

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              window.location.href = '/';
            },
          },
        });
      }}
    >
      Logout
    </button>
  );
}
