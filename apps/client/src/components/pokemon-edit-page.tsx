'use client';

import { notFound } from 'next/navigation';
import { graphql, useLazyLoadQuery } from 'react-relay';
import type { pokemonEditPageQuery } from '~/__generated__/pokemonEditPageQuery.graphql';
import { EditPokemonForm } from '~/components/edit-pokemon-form';

type Props = Readonly<{
  id: string;
}>;

export default function PokemonEditPage({ id }: Props) {
  const data = useLazyLoadQuery<pokemonEditPageQuery>(
    graphql`
      query pokemonEditPageQuery($id: ID!) {
        pokemon(id: $id) {
          ...editPokemonForm_pokemon
        }
      }
    `,
    { id },
  );

  if (!data.pokemon) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Pokemon</h1>
      <EditPokemonForm pokemon={data.pokemon} />
    </div>
  );
}
