import prisma from '../../prisma/prisma.tsx';
import builder from '../builder.tsx';
import decodeIDOrThrow from '../lib/decodeIDOrThrow.tsx';

const MAX_RESULTS = 10;

const Pokemon = builder.prismaNode('Pokemon', {
  fields: (t) => ({
    name: t.exposeString('name', { nullable: false }),
    primaryType: t.exposeString('primary_type', { nullable: false }),
    secondaryType: t.exposeString('secondary_type'),
    caughtPokemons: t.relatedConnection('caughtPokemon', {
      cursor: 'id',
      nullable: false,
      authScopes: {
        role: 'user',
      },
      query: (_, context) => ({
        where: {
          user_id: context.sessionUser?.id,
        },
        orderBy: { caught_at: 'asc' },
      }),
    }),
  }),
  id: { field: 'id' },
});

export const PokemonConnection = builder.connectionObject({
  name: 'PokemonConnection',
  type: Pokemon,
});

builder.queryFields((t) => ({
  pokemon: t.prismaField({
    args: { id: t.arg.id({ required: true }) },
    authScopes: {
      role: 'user',
    },
    resolve: (query, _, { id }) =>
      prisma.pokemon.findUnique({
        ...query,
        where: {
          id: Number(decodeIDOrThrow('pokemon', id)),
        },
      }),
    type: 'Pokemon',
  }),
  pokemons: t.prismaConnection({
    args: {
      name: t.arg.string({ required: false }),
    },
    cursor: 'id',
    resolve: (query, _, { name }) => {
      name = name?.trim() || '';
      return prisma.pokemon.findMany({
        ...query,
        take: MAX_RESULTS,
        where:
          name.length >= 1
            ? {
                name: {
                  contains: name,
                  mode: 'insensitive',
                },
              }
            : undefined,
      });
    },
    type: 'Pokemon',
  }),
}));

export default Pokemon;
