'use client';

import isPresent from '@nkzw/core/isPresent';
import type React from 'react';
import { useEffect, useState } from 'react';
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay';
import type { UserDetailsRelayEntryPointQuery } from '~/__generated__/UserDetailsRelayEntryPointQuery.graphql';
import type { UserDetailsUserCard_user$key } from '~/__generated__/UserDetailsUserCard_user.graphql';

export default function UserDetails() {
  const { viewer } = useLazyLoadQuery<UserDetailsRelayEntryPointQuery>(
    graphql`
      query UserDetailsRelayEntryPointQuery {
        viewer {
          ...UserDetailsUserCard_user
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

  if (!viewer || !isHydrated) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
        <h3 className="text-lg font-semibold">No profile</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You are not signed in.
        </p>
      </div>
    );
  }

  return <UserCard user={viewer} />;
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

function UserCard({ user: userKey }: { user: UserDetailsUserCard_user$key }) {
  const user = useFragment(
    graphql`
      fragment UserDetailsUserCard_user on User {
        name
        email
        pokemons {
          edges {
            node {
              id
              nickname
              pokemon {
                name
              }
              shiny
            }
          }
        }
      }
    `,
    userKey,
  );

  return (
    <div>
      <div className="flex items-center gap-6 py-6">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            {user.email}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="accent">
              {user.pokemons.edges?.filter(isPresent).length ?? 0} Pokémon
            </Badge>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 py-4 dark:border-neutral-600">
        <h3 className="mb-3 text-lg font-medium">Pokemon Collection</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {user.pokemons.edges?.filter(isPresent).map(({ node }) =>
            node ? (
              <div
                key={node.id}
                className="flex items-center justify-between rounded-lg border border-transparent bg-neutral-50 px-4 py-3 shadow-sm dark:bg-neutral-800/30"
              >
                <div>
                  <div className="text-sm font-semibold">{node.nickname}</div>
                  <div className="mt-0.5 text-xs text-neutral-100 dark:text-neutral-400">
                    {node.pokemon?.name}
                  </div>
                </div>
                <div>
                  {node.shiny ? (
                    <span className="ml-4 inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                      ✨ Shiny
                    </span>
                  ) : null}
                </div>
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
