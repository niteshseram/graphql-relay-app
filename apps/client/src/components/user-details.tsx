'use client';

import isPresent from '@nkzw/core/isPresent';
import Link from 'next/link';
import type React from 'react';
import { useEffect, useState } from 'react';
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay';
import type { userDetailsRelayEntryPointQuery } from '~/__generated__/userDetailsRelayEntryPointQuery.graphql';
import type { userDetailsUserCard_user$key } from '~/__generated__/userDetailsUserCard_user.graphql';
import { Button } from '~/components/ui/button';
import PokemonCollection from './pokemon-collection';

export default function UserDetails() {
  const data = useLazyLoadQuery<userDetailsRelayEntryPointQuery>(
    graphql`
      query userDetailsRelayEntryPointQuery {
        viewer {
          ...userDetailsUserCard_user
          ...pokemonCollection_user
        }
      }
    `,
    {},
  );

  // Avoid server/client hydration mismatch by rendering a neutral placeholder
  // during the initial render (SSR) and until the client has hydrated.
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  if (!data.viewer || !isHydrated) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
        <h3 className="text-lg font-semibold">No profile</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You are not signed in.
        </p>
      </div>
    );
  }

  return (
    <div>
      <UserCard user={data.viewer} />
      <div className="border-t border-gray-100 py-4 dark:border-neutral-600">
        <h2 className="mb-3 text-lg font-medium">Pokemon caught</h2>
        <PokemonCollection user={data.viewer} variant="default" />
      </div>
    </div>
  );
}

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: 'muted' | 'accent';
}) {
  const base =
    'inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium';
  const cls =
    variant === 'accent'
      ? base +
        ' bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'
      : base +
        ' bg-neutral-100 text-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-200';
  return <span className={cls}>{children}</span>;
}

function UserCard({ user: userKey }: { user: userDetailsUserCard_user$key }) {
  const user = useFragment(
    graphql`
      fragment userDetailsUserCard_user on User {
        id
        name
        email
        username
        pokemons(first: 100) {
          edges {
            node {
              id
            }
          }
        }
      }
    `,
    userKey,
  );

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <Button asChild variant="outline">
            <Link href="/me/edit">Edit profile</Link>
          </Button>
        </div>
        <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          {user.email}
        </div>
        {user.username && (
          <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            @{user.username}
          </div>
        )}
        <div className="mt-3 flex items-center gap-2">
          <Badge variant="accent">
            {user.pokemons.edges?.filter(isPresent).length ?? 0} Pokémon
          </Badge>
        </div>
      </div>
    </div>
  );
}
