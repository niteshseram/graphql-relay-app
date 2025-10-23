'use client';
import Link from 'next/link';
import { useEffect, useId, useRef } from 'react';
import {
  graphql,
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay';
import { useDebounceValue } from 'usehooks-ts';
import type { pokemonListingCard_pokemon$key } from '~/__generated__/pokemonListingCard_pokemon.graphql';
import type { pokemonListingContent_query$key } from '~/__generated__/pokemonListingContent_query.graphql';
import type { pokemonListingQuery } from '~/__generated__/pokemonListingQuery.graphql';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useCatchPokemon } from '~/hooks/use-catch-pokemon';
import { cn } from '~/lib/utils';

export default function PokemonsListing() {
  const [query, setQuery] = useDebounceValue('', 500);
  const searchId = useId();

  const queryRef = useLazyLoadQuery<pokemonListingQuery>(
    graphql`
      query pokemonListingQuery($name: String) {
        ...pokemonListingContent_query @arguments(name: $name)
      }
    `,
    { name: query },
  );

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
      <PokemonListingContent queryRef={queryRef} />
    </div>
  );
}

type PokemonListingContentProps = Readonly<{
  queryRef: pokemonListingContent_query$key;
}>;

function PokemonListingContent({ queryRef }: PokemonListingContentProps) {
  const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment(
    graphql`
      fragment pokemonListingContent_query on Query 
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        after: { type: "String" }
        name: { type: "String" }
      )
      @refetchable(queryName: "PokemonListingPaginationQuery") {
        pokemons(
          first: $count
          after: $after
          name: $name
        ) @connection(key: "PokemonListingContent_pokemons") {
          edges {
            node {
              id
              ...pokemonListingCard_pokemon
            }
          }
        }
      }
    `,
    queryRef,
  );

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasNext && !isLoadingNext) {
          loadNext(10);
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNext, isLoadingNext, loadNext]);

  const edges = data.pokemons?.edges ?? [];

  if (edges.length === 0) {
    return (
      <div className="p-6 text-center">No pokémons match your search.</div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {edges.map((edge) =>
          edge?.node ? (
            <PokemonCard key={edge.node.id} pokemon={edge.node} />
          ) : null,
        )}
      </div>
      <div
        ref={loadMoreRef}
        className="h-16 mt-4 flex items-center justify-center"
      >
        {isLoadingNext ? (
          <div className="text-center text-sm text-neutral-600">
            Loading more Pokémon...
          </div>
        ) : hasNext ? (
          <div className="text-center text-sm text-neutral-600">
            Scroll to load more
          </div>
        ) : (
          <div className="text-center text-sm text-neutral-600">
            That's all for now!
          </div>
        )}
      </div>
    </>
  );
}

function PokemonCard({ pokemon }: { pokemon: pokemonListingCard_pokemon$key }) {
  const data = useFragment(
    graphql`
  fragment pokemonListingCard_pokemon on Pokemon {
    id,
    name
    primaryType
    secondaryType
  }
`,
    pokemon,
  );
  const { catchPokemon, isCatching } = useCatchPokemon();

  return (
    <div
      className={cn(
        'rounded-lg border p-4 shadow-sm bg-white dark:bg-neutral-900',
        'relative',
      )}
    >
      <Link href={`/pokemons/${data.id}`} className="absolute inset-0" />
      <div className="flex justify-between items-center">
        {data.name} <code className="text-xs text-neutral-500">{data.id}</code>
      </div>
      <div className="mt-2 flex gap-2">
        <span className="inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
          {data.primaryType}
        </span>
        {data.secondaryType ? (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
            {data.secondaryType}
          </span>
        ) : null}
      </div>
      <div className="mt-4 relative z-10">
        <Button
          onClick={() => catchPokemon(data.id)}
          disabled={isCatching}
          size="sm"
          variant="outline"
          className="w-full"
        >
          {isCatching ? 'Catching...' : 'Catch'}
        </Button>
      </div>
    </div>
  );
}
