import { graphql, useMutation } from 'react-relay';
import type { useReleasePokemonMutation } from '~/__generated__/useReleasePokemonMutation.graphql';

export function useReleasePokemon() {
  const [commitReleasePokemon, isReleasing] =
    useMutation<useReleasePokemonMutation>(graphql`
      mutation useReleasePokemonMutation(
        $input: ReleasePokemonInput!
        $connections: [ID!]!
      ) {
        releasePokemon(input: $input) {
          deletedId @deleteEdge(connections: $connections)
        }
      }
    `);

  function releasePokemon(id: string, userId: string) {
    // TODO: See if there's a better way to construct this connection id. This is NOT typesafe.
    const connectionId = `client:${userId}:pokemons(first:100)`;

    return commitReleasePokemon({
      variables: {
        input: {
          id,
        },
        connections: [connectionId],
      },
    });
  }

  return {
    releasePokemon,
    isReleasing,
  };
}
