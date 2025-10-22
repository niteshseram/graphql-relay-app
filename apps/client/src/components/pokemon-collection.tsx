'use client';

import isPresent from '@nkzw/core/isPresent';
import { graphql, useFragment } from 'react-relay';
import type { pokemonCollection_user$key } from '~/__generated__/pokemonCollection_user.graphql';

type PokemonCollectionProps = {
  user: pokemonCollection_user$key;
  variant?: 'default' | 'compact';
};

export default function PokemonCollection({
  user: userRef,
  variant = 'default',
}: PokemonCollectionProps) {
  const data = useFragment(
    graphql`
  fragment pokemonCollection_user on User {
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
    userRef,
  );
  const pokemons = data.pokemons?.edges?.filter(isPresent) ?? [];

  if (pokemons.length === 0) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <div className="px-4">
        <h3 className="mb-2 text-sm font-semibold">My Pokémon</h3>
        <div className="space-y-2">
          {pokemons.map(({ node }) =>
            node ? (
              <div
                key={node.id}
                className="flex items-center justify-between rounded-md bg-secondary/50 px-3 py-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span>{node.nickname}</span>
                </div>
                {node.shiny && (
                  <span className="text-xs text-yellow-500">✨</span>
                )}
              </div>
            ) : null,
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {pokemons.map(({ node }) =>
        node ? (
          <div
            key={node.id}
            className="flex items-center justify-between rounded-lg border border-transparent bg-neutral-50 px-4 py-3 shadow-sm dark:bg-neutral-800/30"
          >
            <div>
              <div className="text-sm font-semibold">{node.nickname}</div>
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
  );
}
