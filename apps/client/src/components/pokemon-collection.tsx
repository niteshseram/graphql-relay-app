'use client';

import isPresent from '@nkzw/core/isPresent';
import Link from 'next/link';
import { graphql, useFragment } from 'react-relay';
import type { pokemonCollection_pokemon$key } from '~/__generated__/pokemonCollection_pokemon.graphql';
import type { pokemonCollection_user$key } from '~/__generated__/pokemonCollection_user.graphql';
import { Button } from '~/components/ui/button';
import { useReleasePokemon } from '~/hooks/use-release-pokemon';
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
    id
    pokemons(first: 100) {
      edges {
        node {
          id
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
        <h3 className="mb-2 text-sm">Pokémon caught</h3>
        <div className="space-y-2">
          {pokemons.map(({ node }) =>
            node ? (
              <PokemonDetail
                key={node.id}
                pokemon={node}
                variant="compact"
                userId={data.id}
              />
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
          <PokemonDetail
            key={node.id}
            pokemon={node}
            variant="default"
            userId={data.id}
          />
        ) : null,
      )}
    </div>
  );
}

function PokemonDetail({
  pokemon,
  variant = 'default',
  userId,
}: {
  variant?: 'default' | 'compact';
  pokemon: pokemonCollection_pokemon$key;
  userId: string;
}) {
  const data = useFragment(
    graphql`
      fragment pokemonCollection_pokemon on CaughtPokemon {
        id
        nickname
        pokemon {
          id
          name
        }
        shiny
      }
    `,
    pokemon,
  );

  const { releasePokemon, isReleasing } = useReleasePokemon();

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
            (
            <Link
              className="text-neutral-900 dark:text-neutral-500 hover:underline"
              href={`/pokemons/${data.pokemon.id}`}
            >
              {data.pokemon.name}
            </Link>
            )
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {data.shiny ? (
          variant === 'compact' ? (
            <span className="text-xs text-yellow-500">✨</span>
          ) : (
            <span className="ml-4 inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
              ✨ Shiny
            </span>
          )
        ) : null}
        {variant === 'default' && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => releasePokemon(data.id, userId)}
            disabled={isReleasing || !userId}
          >
            Release
          </Button>
        )}
      </div>
    </div>
  );
}
