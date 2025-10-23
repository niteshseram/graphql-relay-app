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
          name,
          email,
          ...pokemonCollection_user
        }
      }
    `,
    {},
  );

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="text-lg font-semibold">Account</div>
        {isLoggedIn ? (
          <Link
            className="flex flex-col gap-1 border border-gray-800 rounded px-3 py-2 hover:bg-neutral-900 transition-colors"
            href="/me"
          >
            <span className="text-sm">{data.viewer?.name}</span>
            <div className="text-xs text-gray-500">{data.viewer?.email}</div>
          </Link>
        ) : (
          <div>No user is signed in</div>
        )}
      </SidebarHeader>
      <SidebarContent className="flex-1 px-2">
        {isLoggedIn && data.viewer && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <span>Pokedex</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <PokemonCollection user={data.viewer} variant="compact" />
            </SidebarMenuItem>
          </SidebarMenu>
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
