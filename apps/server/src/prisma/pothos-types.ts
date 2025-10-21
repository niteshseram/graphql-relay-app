/* eslint-disable */
import type {
  Prisma,
  User,
  Session,
  Account,
  Verification,
  Pokemon,
  CaughtPokemon,
} from './prisma-client/client.js';
import type { PothosPrismaDatamodel } from '@pothos/plugin-prisma';
export default interface PrismaTypes {
  User: {
    Name: 'User';
    Shape: User;
    Include: Prisma.UserInclude;
    Select: Prisma.UserSelect;
    OrderBy: Prisma.UserOrderByWithRelationInput;
    WhereUnique: Prisma.UserWhereUniqueInput;
    Where: Prisma.UserWhereInput;
    Create: {};
    Update: {};
    RelationName: 'accounts' | 'CaughtPokemon' | 'sessions';
    ListRelations: 'accounts' | 'CaughtPokemon' | 'sessions';
    Relations: {
      accounts: {
        Shape: Account[];
        Name: 'Account';
        Nullable: false;
      };
      CaughtPokemon: {
        Shape: CaughtPokemon[];
        Name: 'CaughtPokemon';
        Nullable: false;
      };
      sessions: {
        Shape: Session[];
        Name: 'Session';
        Nullable: false;
      };
    };
  };
  Session: {
    Name: 'Session';
    Shape: Session;
    Include: Prisma.SessionInclude;
    Select: Prisma.SessionSelect;
    OrderBy: Prisma.SessionOrderByWithRelationInput;
    WhereUnique: Prisma.SessionWhereUniqueInput;
    Where: Prisma.SessionWhereInput;
    Create: {};
    Update: {};
    RelationName: 'user';
    ListRelations: never;
    Relations: {
      user: {
        Shape: User;
        Name: 'User';
        Nullable: false;
      };
    };
  };
  Account: {
    Name: 'Account';
    Shape: Account;
    Include: Prisma.AccountInclude;
    Select: Prisma.AccountSelect;
    OrderBy: Prisma.AccountOrderByWithRelationInput;
    WhereUnique: Prisma.AccountWhereUniqueInput;
    Where: Prisma.AccountWhereInput;
    Create: {};
    Update: {};
    RelationName: 'user';
    ListRelations: never;
    Relations: {
      user: {
        Shape: User;
        Name: 'User';
        Nullable: false;
      };
    };
  };
  Verification: {
    Name: 'Verification';
    Shape: Verification;
    Include: never;
    Select: Prisma.VerificationSelect;
    OrderBy: Prisma.VerificationOrderByWithRelationInput;
    WhereUnique: Prisma.VerificationWhereUniqueInput;
    Where: Prisma.VerificationWhereInput;
    Create: {};
    Update: {};
    RelationName: never;
    ListRelations: never;
    Relations: {};
  };
  Pokemon: {
    Name: 'Pokemon';
    Shape: Pokemon;
    Include: Prisma.PokemonInclude;
    Select: Prisma.PokemonSelect;
    OrderBy: Prisma.PokemonOrderByWithRelationInput;
    WhereUnique: Prisma.PokemonWhereUniqueInput;
    Where: Prisma.PokemonWhereInput;
    Create: {};
    Update: {};
    RelationName: 'CaughtPokemon';
    ListRelations: 'CaughtPokemon';
    Relations: {
      CaughtPokemon: {
        Shape: CaughtPokemon[];
        Name: 'CaughtPokemon';
        Nullable: false;
      };
    };
  };
  CaughtPokemon: {
    Name: 'CaughtPokemon';
    Shape: CaughtPokemon;
    Include: Prisma.CaughtPokemonInclude;
    Select: Prisma.CaughtPokemonSelect;
    OrderBy: Prisma.CaughtPokemonOrderByWithRelationInput;
    WhereUnique: Prisma.CaughtPokemonWhereUniqueInput;
    Where: Prisma.CaughtPokemonWhereInput;
    Create: {};
    Update: {};
    RelationName: 'pokemon' | 'user';
    ListRelations: never;
    Relations: {
      pokemon: {
        Shape: Pokemon;
        Name: 'Pokemon';
        Nullable: false;
      };
      user: {
        Shape: User;
        Name: 'User';
        Nullable: false;
      };
    };
  };
}
export function getDatamodel(): PothosPrismaDatamodel {
  return JSON.parse(
    '{"datamodel":{"models":{"User":{"fields":[{"type":"Account","kind":"object","name":"accounts","isRequired":true,"isList":true,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"AccountToUser","relationFromFields":[],"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"banExpires","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"Boolean","kind":"scalar","name":"banned","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"banReason","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"CaughtPokemon","kind":"object","name":"CaughtPokemon","isRequired":true,"isList":true,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"CaughtPokemonToUser","relationFromFields":[],"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"createdAt","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"displayUsername","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"email","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":true,"isId":false,"isUpdatedAt":false},{"type":"Boolean","kind":"scalar","name":"emailVerified","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"id","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":true,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"image","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"locale","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"name","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"password","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"role","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"Session","kind":"object","name":"sessions","isRequired":true,"isList":true,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"SessionToUser","relationFromFields":[],"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"updatedAt","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"username","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":true,"isId":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueIndexes":[]},"Session":{"fields":[{"type":"String","kind":"scalar","name":"id","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":true,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"expiresAt","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"token","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":true,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"createdAt","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"updatedAt","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"ipAddress","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"userAgent","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"userId","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"User","kind":"object","name":"user","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"SessionToUser","relationFromFields":["userId"],"isUpdatedAt":false}],"primaryKey":null,"uniqueIndexes":[{"name":null,"fields":["token"]}]},"Account":{"fields":[{"type":"String","kind":"scalar","name":"id","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":true,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"accountId","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"providerId","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"userId","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"User","kind":"object","name":"user","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"AccountToUser","relationFromFields":["userId"],"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"accessToken","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"refreshToken","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"idToken","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"accessTokenExpiresAt","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"refreshTokenExpiresAt","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"scope","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"password","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"createdAt","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"updatedAt","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueIndexes":[]},"Verification":{"fields":[{"type":"String","kind":"scalar","name":"id","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":true,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"identifier","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"value","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"expiresAt","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"createdAt","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"updatedAt","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueIndexes":[]},"Pokemon":{"fields":[{"type":"Int","kind":"scalar","name":"id","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":true,"isUpdatedAt":false},{"type":"CaughtPokemon","kind":"object","name":"CaughtPokemon","isRequired":true,"isList":true,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"CaughtPokemonToPokemon","relationFromFields":[],"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"name","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":true,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"primaryType","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"secondaryType","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueIndexes":[]},"CaughtPokemon":{"fields":[{"type":"String","kind":"scalar","name":"id","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":true,"isUpdatedAt":false},{"type":"DateTime","kind":"scalar","name":"caughtAt","isRequired":true,"isList":false,"hasDefaultValue":true,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"nickname","isRequired":false,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"Pokemon","kind":"object","name":"pokemon","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"CaughtPokemonToPokemon","relationFromFields":["pokemonId"],"isUpdatedAt":false},{"type":"Int","kind":"scalar","name":"pokemonId","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"Boolean","kind":"scalar","name":"shiny","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"Json","kind":"scalar","name":"stats","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false},{"type":"User","kind":"object","name":"user","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"relationName":"CaughtPokemonToUser","relationFromFields":["userId"],"isUpdatedAt":false},{"type":"String","kind":"scalar","name":"userId","isRequired":true,"isList":false,"hasDefaultValue":false,"isUnique":false,"isId":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueIndexes":[]}}}}',
  );
}
