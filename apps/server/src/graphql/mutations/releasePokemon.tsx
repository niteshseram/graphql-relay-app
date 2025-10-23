import prisma from '../../prisma/prisma.tsx';
import builder from '../builder.tsx';
import decodeIDOrThrow from '../lib/decodeIDOrThrow.tsx';

const ReleasePokemonInput = builder.inputType('ReleasePokemonInput', {
  fields: (t) => ({
    id: t.id({ required: true }),
  }),
});

const ReleasePokemonResult = builder.objectRef<{
  deletedId: string;
}>('ReleasePokemonResult');

ReleasePokemonResult.implement({
  fields: (t) => ({
    deletedId: t.exposeID('deletedId', { nullable: true }),
  }),
});

builder.mutationFields((t) => ({
  releasePokemon: t.field({
    type: ReleasePokemonResult,
    args: {
      input: t.arg({ type: ReleasePokemonInput, required: true }),
    },
    authScopes: {
      role: 'user',
    },
    async resolve(_parent, { input: { id } }, { sessionUser }) {
      if (!sessionUser) {
        throw new Error('Unauthorized');
      }

      const caughtPokemonId = String(decodeIDOrThrow('cp', id));
      const caughtPokemon = await prisma.caughtPokemon.findUnique({
        where: { id: caughtPokemonId },
        select: { user_id: true },
      });

      if (!caughtPokemon) {
        throw new Error('Pokemon not found');
      }

      if (caughtPokemon.user_id !== sessionUser.id) {
        throw new Error('Not authorized');
      }

      await prisma.caughtPokemon.delete({
        where: { id: caughtPokemonId },
      });

      // Return the original global id so Relay can use it with @deleteEdge
      return { deletedId: id };
    },
  }),
}));
