'use client';

import isPresent from '@nkzw/core/isPresent';
import { graphql, useFragment } from 'react-relay';
import type { pokemonCollection_pokemon$key } from '~/__generated__/pokemonCollection_pokemon.graphql';
import type { pokemonCollection_user$key } from '~/__generated__/pokemonCollection_user.graphql';
import { cn } from '~/lib/utils';

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
          id,
          ...pokemonCollection_pokemon
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
      <div className="px-2">
        <h3 className="mb-2 text-sm font-semibold">My Pokémon</h3>
        <div className="space-y-2">
          {pokemons.map(({ node }) =>
            node ? (
              <PokemonDetail key={node.id} pokemon={node} variant="compact" />
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
          <PokemonDetail key={node.id} pokemon={node} variant="default" />
        ) : null,
      )}
    </div>
  );
}

function PokemonDetail({
  pokemon,
  variant = 'default',
}: {
  variant?: 'default' | 'compact';
  pokemon: pokemonCollection_pokemon$key;
}) {
  const data = useFragment(
    graphql`
      fragment pokemonCollection_pokemon on CaughtPokemon {
        id
        nickname
        pokemon {
          name
        }
        shiny
      }
    `,
    pokemon,
  );

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg border border-transparent bg-neutral-50 shadow-sm dark:bg-neutral-800/30',
        variant === 'compact' ? 'px-2 py-1' : 'px-4 py-3',
      )}
    >
      <div className={cn(variant === 'compact' ? 'text-xs' : 'text-sm')}>
        <span className="font-semibold">{data.nickname}</span>
        {data.pokemon?.name && (
          <span className="text-neutral-900 dark:text-neutral-500">
            {' '}
            ({data.pokemon.name})
          </span>
        )}
      </div>
      <div>
        {data.shiny ? (
          variant === 'compact' ? (
            <span className="text-xs text-yellow-500">✨</span>
          ) : (
            <span className="ml-4 inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
              ✨ Shiny
            </span>
          )
        ) : null}
      </div>
    </div>
  );
}
