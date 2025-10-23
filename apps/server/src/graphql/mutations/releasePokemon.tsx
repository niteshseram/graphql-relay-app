import prisma from '../../prisma/prisma.tsx';
import builder from '../builder.tsx';
import decodeIDOrThrow from '../lib/decodeIDOrThrow.tsx';

const ReleasePokemonInput = builder.inputType('ReleasePokemonInput', {
  fields: (t) => ({
    id: t.id({ required: true }),
  }),
});

const ReleasePokemonResult = builder.objectRef<{ success: boolean }>(
  'ReleasePokemonResult',
);
ReleasePokemonResult.implement({
  fields: (t) => ({
    success: t.exposeBoolean('success', { nullable: false }),
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
      console.log(id, caughtPokemonId);
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

      return { success: true };
    },
  }),
}));
