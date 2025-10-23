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

  function releasePokemon(
    caughtPokemonId: string,
    userId: string,
    pokemonId?: string,
  ) {
    return commitReleasePokemon({
      variables: {
        input: {
          id: caughtPokemonId,
        },

        connections: [
          // TODO: See if there's a better way to construct this connection id. This is NOT typesafe.
          `client:${userId}:pokemons(first:100)`,
          // TODO: This is sometimes redundant because the pokemon's details page was not visited and thus this connection does not exist.
          // Find a way to only include this when necessary.
          pokemonId ? `client:${pokemonId}:caughtPokemons` : '',
        ],
      },
    });
  }

  return {
    releasePokemon,
    isReleasing,
  };
}
