'use client';
import isPresent from '@nkzw/core/isPresent.js';
import { Suspense } from 'react';
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay';
import SignIn from '../components/auth/sign-in';
import { SignOutButton } from '../components/auth/sign-out-button';
import { authClient } from '../lib/auth-client';
import type { pageRelayEntryPointQuery } from './__generated__/pageRelayEntryPointQuery.graphql';
import type { pageUserCard_user$key } from './__generated__/pageUserCard_user.graphql';

export default function Home() {
  const { data: session } = authClient.useSession();

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
            <Suspense>
              <RelayEntryPoint />
            </Suspense>
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

const UserCard = ({ user: userKey }: { user: pageUserCard_user$key }) => {
  const user = useFragment(
    graphql`
      fragment pageUserCard_user on User {
        caughtPokemon {
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
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-bold">Pokémon Collection</h2>
      <div className="flex flex-col gap-2">
        {user.caughtPokemon.edges?.filter(isPresent).map(({ node }) =>
          node ? (
            <div className="flex items-center gap-2" key={node.id}>
              <span>{node.nickname}</span>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};

const RelayEntryPoint = () => {
  const data = useLazyLoadQuery<pageRelayEntryPointQuery>(
    graphql`
      query pageRelayEntryPointQuery {
        viewer {
          ...pageUserCard_user
        }
      }
    `,
    {},
  );

  return data.viewer ? <UserCard user={data.viewer} /> : null;
};
