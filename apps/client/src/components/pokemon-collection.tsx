'use client';

import isPresent from '@nkzw/core/isPresent';
import { graphql, useFragment, useMutation } from 'react-relay';
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

  const [commitReleasePokemon, isReleasing] = useMutation(graphql`
    mutation pokemonCollectionReleaseMutation(
      $input: ReleasePokemonInput!
    ) {
      releasePokemon(input: $input) {
        success
      }
    }
  `);

  function onRelease() {
    if (window.confirm('Are you sure you want to release this Pokemon?')) {
      commitReleasePokemon({
        variables: {
          input: {
            id: data.id,
          },
        },
        updater: (store) => {
          // Update the viewer's pokemons connection
          const userPokemonsConnection = store
            .getRoot()
            .getLinkedRecord('viewer')
            ?.getLinkedRecord('pokemons(first:100)');
          const edges = userPokemonsConnection?.getLinkedRecords('edges');

          if (edges && userPokemonsConnection) {
            const newEdges = edges.filter(
              (edge) => edge.getLinkedRecord('node')?.getDataID() !== data.id,
            );

            userPokemonsConnection.setLinkedRecords(newEdges, 'edges');
          }

          // Update the Pokemon's caughtPokemons connection
          const caughtPokemon = store.get(data.id);
          const pokemon = caughtPokemon?.getLinkedRecord('pokemon');
          const caughtPokemonsConnection =
            pokemon?.getLinkedRecord('caughtPokemons');
          const caughtPokemonEdges =
            caughtPokemonsConnection?.getLinkedRecords('edges');

          if (caughtPokemonEdges && caughtPokemonsConnection) {
            const newEdges = caughtPokemonEdges.filter(
              (edge) => edge.getLinkedRecord('node')?.getDataID() !== data.id,
            );
            caughtPokemonsConnection.setLinkedRecords(newEdges, 'edges');
          }

          // Finally delete the caught Pokemon node
          store.delete(data.id);
        },
      });
    }
  }

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
          <button
            type="button"
            onClick={onRelease}
            disabled={isReleasing}
            className={cn(
              'rounded px-2 py-1 text-xs text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'text-xs',
            )}
          >
            {isReleasing ? 'Releasing...' : 'Release'}
          </button>
        )}
      </div>
    </div>
  );
}
