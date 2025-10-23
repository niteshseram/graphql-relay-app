import { graphql, useMutation } from 'react-relay';
import type { useCatchPokemonMutation } from '~/__generated__/useCatchPokemonMutation.graphql';

export function useCatchPokemon() {
  const [commitCatchPokemon, isCatching] =
    useMutation<useCatchPokemonMutation>(graphql`
      mutation useCatchPokemonMutation($input: CatchPokemonInput!) {
        catchPokemon(input: $input) {
          id
          ...pokemonCollection_pokemon
        }
      }
    `);

  function catchPokemon(pokemonId: string) {
    return commitCatchPokemon({
      variables: {
        input: {
          pokemonId,
        },
      },
      updater: (store) => {
        const root = store.getRoot();
        const viewer = root.getLinkedRecord('viewer');
        if (!viewer) return;

        // Get or create the pokemons connection
        let pokemonsConnection = viewer.getLinkedRecord('pokemons');
        if (!pokemonsConnection) {
          pokemonsConnection = store.create(
            `client:${viewer.getDataID()}:pokemons`,
            'UserPokemonsConnection',
          );
          viewer.setLinkedRecord(pokemonsConnection, 'pokemons');
        }

        // Get the new caught pokemon from the payload
        const newPokemon = store.getRootField('catchPokemon');
        if (!newPokemon) {
          return;
        }

        // Create an edge for the new pokemon
        const newEdge = store.create(
          `client:${viewer.getDataID()}:pokemons:edges:${newPokemon.getDataID()}`,
          'UserPokemonsConnectionEdge',
        );
        newEdge.setLinkedRecord(newPokemon, 'node');
        newEdge.setValue(new Date().toISOString(), 'cursor');

        // Add the new edge to existing edges
        const existingEdges =
          pokemonsConnection.getLinkedRecords('edges') || [];
        pokemonsConnection.setLinkedRecords(
          [...existingEdges, newEdge],
          'edges',
        );
      },
    });
  }

  return {
    catchPokemon,
    isCatching,
  };
}
