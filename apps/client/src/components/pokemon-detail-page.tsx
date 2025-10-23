'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay';
import type { pokemonDetailPage_pokemon$key } from '~/__generated__/pokemonDetailPage_pokemon.graphql';
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
      }
    `,
    { id },
  );
  if (!data.pokemon) {
    notFound();
  }

  return <PokemonDetails pokemon={data.pokemon} />;
}

function PokemonDetails({
  pokemon,
}: {
  pokemon: pokemonDetailPage_pokemon$key;
}) {
  const data = useFragment(
    graphql`
      fragment pokemonDetailPage_pokemon on Pokemon {
        id
        name
        primaryType
        secondaryType
      }
    `,
    pokemon,
  );
  const { catchPokemon, isCatching } = useCatchPokemon();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pokemon detail page</h1>
        <div className="flex gap-3">
          <Button onClick={() => catchPokemon(data.id)} disabled={isCatching}>
            {isCatching ? 'Catching...' : 'Catch'}
          </Button>
          <Button asChild variant="outline">
            <Link href={`/pokemons/${data.id}/edit`}>Edit Pokemon</Link>
          </Button>
        </div>
      </div>
      <Table className="border">
        <TableBody>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableCell>{data.name}</TableCell>
          </TableRow>
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
    </div>
  );
}
