import random from '@nkzw/core/random.js';
import { names, uniqueNamesGenerator } from 'unique-names-generator';
import prisma from '../../prisma/prisma.tsx';
import builder from '../builder.tsx';
import decodeIDOrThrow from '../lib/decodeIDOrThrow.tsx';

const CatchPokemonInput = builder.inputType('CatchPokemonInput', {
  fields: (t) => ({
    pokemonId: t.id({ required: true }),
    nickname: t.string(),
  }),
});

builder.mutationFields((t) => ({
  catchPokemon: t.prismaField({
    type: 'CaughtPokemon',
    args: {
      input: t.arg({ type: CatchPokemonInput, required: true }),
    },
    authScopes: {
      role: 'user',
    },
    resolve: async (query, _, { input }, { sessionUser }) => {
      if (!sessionUser) {
        throw new Error('not-authenticated');
      }
      const pokemonId = Number(decodeIDOrThrow('pokemon', input.pokemonId));
      const pokemon = await prisma.pokemon.findUnique({
        where: { id: pokemonId },
        select: { name: true },
      });

      if (!pokemon) {
        throw new Error('Pokemon not found');
      }
      return prisma.caughtPokemon.create({
        ...query,
        data: {
          nickname:
            input.nickname ||
            uniqueNamesGenerator({
              dictionaries: [names],
              separator: ' ',
              style: 'capital',
            }),
          pokemon_id: pokemonId,
          user_id: sessionUser.id,
          shiny: random(0, 10) === 0,
          stats: {
            attack: random(70, 110),
            defense: random(60, 100),
            hp: random(60, 120),
            level: random(1, 100),
            special_attack: random(70, 110),
            special_defense: random(60, 100),
            speed: random(70, 100),
          },
        },
      });
    },
  }),
}));
