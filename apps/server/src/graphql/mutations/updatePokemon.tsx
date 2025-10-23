import prisma from '../../prisma/prisma.tsx';
import builder from '../builder.tsx';
import decodeIDOrThrow from '../lib/decodeIDOrThrow.tsx';

const UpdatePokemonInput = builder.inputType('UpdatePokemonInput', {
  fields: (t) => ({
    id: t.id({ required: true }),
    name: t.string({ required: true }),
    primaryType: t.string({ required: true }),
    secondaryType: t.string(),
  }),
});

builder.mutationFields((t) => ({
  updatePokemon: t.prismaField({
    type: 'Pokemon',
    args: {
      input: t.arg({ type: UpdatePokemonInput, required: true }),
    },
    authScopes: {
      role: 'user',
    },
    resolve: async (query, _, { input }, { sessionUser }) => {
      if (!sessionUser) {
        throw new Error('not-authenticated');
      }

      const { id, name, primaryType, secondaryType } = input;
      const pokemonId = decodeIDOrThrow('pm', id);

      return prisma.pokemon.update({
        ...query,
        where: { id: pokemonId },
        data: {
          name,
          primary_type: primaryType,
          secondary_type: secondaryType,
        },
      });
    },
  }),
}));
