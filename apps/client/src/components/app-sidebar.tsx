'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '~/components/ui/sidebar';
import { authClient } from '~/lib/auth-client';
import { SignOutButton } from './auth/sign-out-button';
import { Button } from './ui/button';

export function AppSidebar() {
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLoggedIn = session && isMounted;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="text-lg font-semibold">Account</div>
        {isLoggedIn ? (
          <div className="flex flex-col gap-3">
            <div className="text-sm">{session?.user.name}</div>
            <div className="text-xs text-gray-500">{session?.user.email}</div>
          </div>
        ) : (
          <div>No user is signed in</div>
        )}
      </SidebarHeader>
      <SidebarContent className="flex-1"></SidebarContent>
      <SidebarFooter>
        {isLoggedIn ? (
          <SignOutButton />
        ) : (
          <Button variant="secondary" asChild={true}>
            <Link href="/login">Sign In</Link>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
