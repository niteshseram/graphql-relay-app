'use client';

import { Button } from '~/components/ui/button';
import { authClient } from '~/lib/auth-client';

export function SignOutButton() {
  return (
    <Button
      variant="secondary"
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
    </Button>
  );
}
