import { PrismaClient } from './prisma-client/client.ts';

declare global {
  namespace PrismaJson {
    type PokemonStats = Readonly<{
      attack: number;
      defense: number;
      hp: number;
      level: number;
      special_attack: number;
      special_defense: number;
      speed: number;
    }>;
  }
}

export default new PrismaClient();
