import { ConnectionHandler, graphql, useMutation } from 'react-relay';
import pokemonCollectionUserPokemonsNode from '~/__generated__/pokemonCollection_user.graphql';
import pokemonDetailPageCaughtNode from '~/__generated__/pokemonDetailPageCaught.graphql';
import type { useReleasePokemonMutation } from '~/__generated__/useReleasePokemonMutation.graphql';
import userDetailsUserCardNode from '~/__generated__/userDetailsUserCard_user.graphql';

import { connectionAnnotationKey } from '~/lib/relay-utils';

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
    // TODO: See if there's a better way to construct this connection id. This is NOT typesafe.
    const userDetailsUserCardPokemonsConnectionId =
      ConnectionHandler.getConnectionID(
        userId,
        connectionAnnotationKey(
          'userDetailsUserCard_pokemons',
          userDetailsUserCardNode,
        ),
      );
    const pokemonCollectionUserPokemonsConnectionId =
      ConnectionHandler.getConnectionID(
        userId,
        connectionAnnotationKey(
          'pokemonCollection_user_pokemons',
          pokemonCollectionUserPokemonsNode,
        ),
      );
    const pokemonDetailsPageCaughtPokemonsConnectionId = pokemonId
      ? ConnectionHandler.getConnectionID(
          pokemonId,
          connectionAnnotationKey(
            'pokemonDetailPageCaught__caughtPokemons',
            pokemonDetailPageCaughtNode,
          ),
        )
      : '';

    return commitReleasePokemon({
      variables: {
        input: {
          id: caughtPokemonId,
        },
        connections: [
          userDetailsUserCardPokemonsConnectionId,
          // TODO: This is sometimes redundant because the pokemon's details page was not visited and thus this connection does not exist.
          // Find a way to only include this when necessary.
          pokemonCollectionUserPokemonsConnectionId,
          // TODO: This is sometimes redundant because the pokemon's details page was not visited and thus this connection does not exist.
          // Find a way to only include this when necessary.
          pokemonDetailsPageCaughtPokemonsConnectionId,
        ],
      },
    });
  }

  return {
    releasePokemon,
    isReleasing,
  };
}
