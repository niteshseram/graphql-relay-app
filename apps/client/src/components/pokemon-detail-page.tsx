'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay';
import type { pokemonDetailPage_pokemon$key } from '~/__generated__/pokemonDetailPage_pokemon.graphql';
import type { pokemonDetailPageCaught$key } from '~/__generated__/pokemonDetailPageCaught.graphql';
import type { pokemonDetailPageQuery } from '~/__generated__/pokemonDetailPageQuery.graphql';
import { Button } from '~/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '~/components/ui/table';
import { useCatchPokemon } from '~/hooks/use-catch-pokemon';
import { useReleasePokemon } from '~/hooks/use-release-pokemon';

type Props = Readonly<{
  id: string;
}>;

export default function PokemonDetailPage({ id }: Props) {
  const data = useLazyLoadQuery<pokemonDetailPageQuery>(
    graphql`
      query pokemonDetailPageQuery($id: ID!) {
        pokemon(id: $id) {
          ...pokemonDetailPage_pokemon
        }
        viewer {
          id
        }
      }
    `,
    { id },
  );
  if (!data.pokemon) {
    notFound();
  }

  return <PokemonDetails pokemon={data.pokemon} userId={data.viewer?.id} />;
}

function PokemonDetails({
  pokemon,
  userId,
}: {
  pokemon: pokemonDetailPage_pokemon$key;
  userId?: string;
}) {
  const data = useFragment(
    graphql`
      fragment pokemonDetailPage_pokemon on Pokemon {
        id
        name
        primaryType
        secondaryType
        ...pokemonDetailPageCaught
      }
    `,
    pokemon,
  );
  const { catchPokemon, isCatching } = useCatchPokemon();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <div className="flex gap-3">
          <Button onClick={() => catchPokemon(data.id)} disabled={isCatching}>
            {isCatching ? 'Catching...' : 'Catch'}
          </Button>
          <Button asChild variant="outline">
            <Link href={`/pokemons/${data.id}/edit`}>Edit</Link>
          </Button>
        </div>
      </div>
      <Table className="border">
        <TableBody>
          <TableRow>
            <TableHead>Primary type</TableHead>
            <TableCell>
              <span className="inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                {data.primaryType}
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Secondary type</TableHead>
            <TableCell>
              {data.secondaryType ? (
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                  {data.secondaryType}
                </span>
              ) : (
                '—'
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <PokemonCaughtInstances pokemon={data} userId={userId} />
    </div>
  );
}

function PokemonCaughtInstances({
  pokemon,
  userId,
}: {
  pokemon: pokemonDetailPageCaught$key;
  userId?: string;
}) {
  const data = useFragment(
    graphql`
      fragment pokemonDetailPageCaught on Pokemon {
        id
        caughtPokemons(first: 100) @connection(key: 
        "pokemonDetailPageCaught__caughtPokemons") {
          __id
          edges {
            node {
              id
              nickname
              shiny
              caughtAt
            }
          }
        }
        name
      }
    `,
    pokemon,
  );
  const { releasePokemon, isReleasing } = useReleasePokemon();

  if (!data.caughtPokemons?.edges || data.caughtPokemons?.edges?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Caught by you</h2>
      <div>{data.caughtPokemons.__id}</div>
      <div className="grid gap-3 lg:grid-cols-2">
        {data.caughtPokemons.edges.map((edge) => {
          if (!edge?.node) {
            return null;
          }

          const caughtPokemon = edge.node;
          return (
            <div
              key={caughtPokemon.id}
              className="flex items-center justify-between rounded-lg border border-transparent bg-neutral-50 px-4 py-3 shadow-sm dark:bg-neutral-800/30"
            >
              <div className="text-sm">
                <span className="flex gap-2 items-center">
                  <span className="font-medium">{caughtPokemon.nickname}</span>{' '}
                  <code className="text-xs text-neutral-500">
                    {caughtPokemon.id}
                  </code>
                </span>
                <div className="text-xs text-neutral-400 mt-1">
                  Caught on{' '}
                  {new Date(Number(caughtPokemon.caughtAt)).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    },
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {caughtPokemon.shiny && (
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                    ✨ Shiny
                  </span>
                )}
                {userId && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      releasePokemon(caughtPokemon.id, userId, data.id)
                    }
                    disabled={isReleasing || !userId}
                  >
                    Release
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
