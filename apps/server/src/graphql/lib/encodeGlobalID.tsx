const EntityToIDPrefix = {
  CaughtPokemon: 'cp',
  Pokemon: 'pokemon',
  User: 'user',
} as const;

export type Entity = keyof typeof EntityToIDPrefix;
export type EntityIDPrefix = (typeof EntityToIDPrefix)[Entity];

export default function encodeGlobalID(
  typename: Entity,
  id: string | number | bigint,
) {
  return `${EntityToIDPrefix[typename]}_${id}`;
}
