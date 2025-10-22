'use client';
import { useId } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useDebounceValue } from 'usehooks-ts';
import type { PokemonsListingQuery$data } from '~/__generated__/PokemonsListingQuery.graphql';
import { Input } from '~/components/ui/input';

export default function PokemonsListing() {
  const [query, setQuery] = useDebounceValue('', 500);
  const searchId = useId();

  const dataWithFilter = useLazyLoadQuery<{
    response: PokemonsListingQuery$data;
    variables: { name?: string | null };
  }>(
    graphql`
      query PokemonsListingQuery($name: String) {
        pokemons(first: 100, name: $name) {
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
    { name: query },
  );

  const filteredItems = dataWithFilter.pokemons?.edges ?? [];

  return (
    <div>
      <div className="mb-4">
        <label htmlFor={searchId} className="sr-only">
          Search pokemons
        </label>
        <Input
          id={searchId}
          type="search"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name..."
        />
      </div>
      {filteredItems.length === 0 ? (
        <div className="p-6 text-center">No pokémons match your search.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((edge) =>
            edge?.node ? (
              <PokemonCard key={edge.node.id} pokemon={edge.node} />
            ) : null,
          )}
        </div>
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
