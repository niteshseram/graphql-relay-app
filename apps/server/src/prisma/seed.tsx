#!/usr/bin/env NODE_ENV=development node --no-warnings --experimental-specifier-resolution=node --loader ts-node/esm --env-file .env
import { styleText } from 'node:util';
import random from '@nkzw/core/random.js';
import arrayShuffle from 'array-shuffle';
import { auth } from '../lib/auth.tsx';
import { PrismaClient } from './prisma-client/client.ts';

const prisma = new PrismaClient();

const users = new Set([
  {
    data: {
      username: 'admin',
    },
    email: 'admin@nakazawa.dev',
    name: 'Admin',
    password: 'not-a-secure-password',
    role: 'admin',
  },
  {
    data: {
      username: 'first-user',
    },
    email: 'first-user@nakazawa.dev',
    name: 'First User',
    password: 'not-a-secure-password-either',
  },
] as const);

const pokemon = new Set([
  { id: 1, name: 'Bulbasaur', primary_type: 'Grass', secondary_type: 'Poison' },
  { id: 2, name: 'Ivysaur', primary_type: 'Grass', secondary_type: 'Poison' },
  { id: 3, name: 'Venusaur', primary_type: 'Grass', secondary_type: 'Poison' },
  { id: 4, name: 'Charmander', primary_type: 'Fire', secondary_type: null },
  { id: 5, name: 'Charmeleon', primary_type: 'Fire', secondary_type: null },
  { id: 6, name: 'Charizard', primary_type: 'Fire', secondary_type: 'Flying' },
  { id: 7, name: 'Squirtle', primary_type: 'Water', secondary_type: null },
  { id: 8, name: 'Wartortle', primary_type: 'Water', secondary_type: null },
  { id: 9, name: 'Blastoise', primary_type: 'Water', secondary_type: null },
  { id: 10, name: 'Caterpie', primary_type: 'Bug', secondary_type: null },
  { id: 11, name: 'Metapod', primary_type: 'Bug', secondary_type: null },
  { id: 12, name: 'Butterfree', primary_type: 'Bug', secondary_type: 'Flying' },
  { id: 13, name: 'Weedle', primary_type: 'Bug', secondary_type: 'Poison' },
  { id: 14, name: 'Kakuna', primary_type: 'Bug', secondary_type: 'Poison' },
  { id: 15, name: 'Beedrill', primary_type: 'Bug', secondary_type: 'Poison' },
  { id: 16, name: 'Pidgey', primary_type: 'Normal', secondary_type: 'Flying' },
  {
    id: 17,
    name: 'Pidgeotto',
    primary_type: 'Normal',
    secondary_type: 'Flying',
  },
  { id: 18, name: 'Pidgeot', primary_type: 'Normal', secondary_type: 'Flying' },
  { id: 19, name: 'Rattata', primary_type: 'Normal', secondary_type: null },
  { id: 20, name: 'Raticate', primary_type: 'Normal', secondary_type: null },
  { id: 21, name: 'Spearow', primary_type: 'Normal', secondary_type: 'Flying' },
  { id: 22, name: 'Fearow', primary_type: 'Normal', secondary_type: 'Flying' },
  { id: 23, name: 'Ekans', primary_type: 'Poison', secondary_type: null },
  { id: 24, name: 'Arbok', primary_type: 'Poison', secondary_type: null },
  { id: 25, name: 'Pikachu', primary_type: 'Electric', secondary_type: null },
] as const);

console.log(styleText('bold', '› Seeding database...'));

try {
  console.log(styleText('bold', `Creating users`));

  // for (const data of users) {
  //   const { user } = await auth.api.createUser({
  //     body: data,
  //   });

  //   console.log(`  Created user ${styleText('blue', user.name)}.`);
  // }

  // console.log(styleText('bold', `Inserting Pokémon`));

  // for (const data of pokemon) {
  //   const pokemon = await prisma.pokemon.create({
  //     data,
  //   });

  //   console.log(`  Inserted Pokémon ${styleText('blue', pokemon.name)}.`);
  // }

  {
    console.log(styleText('bold', `Creating Caught Pokémon`));
    const pokemon = await prisma.pokemon.findMany();
    const users = await prisma.user.findMany();

    for (const user of users) {
      for (const poke of arrayShuffle(pokemon).slice(0, 10)) {
        await prisma.caughtPokemon.create({
          data: {
            nickname: poke.name,
            pokemon: { connect: { id: poke.id } },
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
            user: { connect: { id: user.id } },
          },
        });
      }
    }
  }
  console.log(styleText(['green', 'bold'], '✓ Done.'));
} finally {
  await prisma.$disconnect();
}
