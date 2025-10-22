'use client';
import { graphql, useLazyLoadQuery } from 'react-relay';
import type { PokemonsListingQuery } from '~/__generated__/PokemonsListingQuery.graphql';

export default function PokemonsListing() {
  const data = useLazyLoadQuery<PokemonsListingQuery>(
    graphql`
          query PokemonsListingQuery {
            pokemons(first: 100) {
              edges {
                node {
                    id
                    name
                    primaryType
                    secondaryType
                }
              }
            }
          }
        `,
    {},
  );

  const items = data.pokemons?.edges ?? [];

  return items.length === 0 ? (
    <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-neutral-700 dark:bg-neutral-900">
      No pokémons found.
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((edge) =>
        edge?.node ? (
          <PokemonCard key={edge.node.id} pokemon={edge.node} />
        ) : null,
      )}
    </div>
  );
}

function PokemonCard({
  pokemon,
}: {
  pokemon: {
    id: string;
    name?: string;
    primaryType: string;
    secondaryType?: string | null;
  };
}) {
  return (
    <div className="rounded-lg border p-4 shadow-sm bg-white dark:bg-neutral-900">
      <div className="text-sm font-medium">{pokemon.name ?? '—'}</div>
      <div className="mt-2 flex gap-2">
        <span className="inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
          {pokemon.primaryType}
        </span>
        {pokemon.secondaryType ? (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
            {pokemon.secondaryType}
          </span>
        ) : null}
      </div>
    </div>
  );
}
