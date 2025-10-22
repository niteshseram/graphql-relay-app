'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import type { appSidebarQuery } from '~/__generated__/appSidebarQuery.graphql';
import { Button } from '~/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar';
import { authClient } from '~/lib/auth-client';
import { SignOutButton } from './auth/sign-out-button';
import PokemonCollection from './pokemon-collection';

export function AppSidebar() {
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLoggedIn = session && isMounted;

  const data = useLazyLoadQuery<appSidebarQuery>(
    graphql`
      query appSidebarQuery {
        viewer {
          ...pokemonCollection_user
        }
      }
    `,
    {},
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="text-lg font-semibold">Account</div>
        {isLoggedIn ? (
          <div className="flex flex-col gap-3">
            <Link className="text-sm" href="/me">
              {session?.user.name}
            </Link>
            <div className="text-xs text-gray-500">{session?.user.email}</div>
          </div>
        ) : (
          <div>No user is signed in</div>
        )}
      </SidebarHeader>
      <SidebarContent className="flex-1">
        {isLoggedIn && data.viewer && (
          <>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <PokemonCollection user={data.viewer} variant="compact" />
          </>
        )}
      </SidebarContent>
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
