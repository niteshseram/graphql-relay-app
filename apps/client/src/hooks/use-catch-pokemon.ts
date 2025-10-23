import { graphql, useMutation } from 'react-relay';
import type { useCatchPokemonMutation } from '~/__generated__/useCatchPokemonMutation.graphql';

export function useCatchPokemon() {
  const [commitCatchPokemon, isCatching] =
    useMutation<useCatchPokemonMutation>(graphql`
      mutation useCatchPokemonMutation($input: CatchPokemonInput!) {
        catchPokemon(input: $input) {
          id
          caughtAt,
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
        if (!viewer) {
          return;
        }

        // Get or create the viewer's pokemons connection
        let pokemonsConnection = viewer.getLinkedRecord('pokemons(first:100)');
        if (!pokemonsConnection) {
          pokemonsConnection = store.create(
            `client:${viewer.getDataID()}:pokemons`,
            'UserPokemonsConnection',
          );
          viewer.setLinkedRecord(pokemonsConnection, 'pokemons');
        }

        // Get the caught pokemon from the payload
        const newPokemon = store.getRootField('catchPokemon');
        if (!newPokemon) {
          return;
        }

        // Create an edge for the new pokemon in viewer's pokemons
        const newEdge = store.create(
          `client:${viewer.getDataID()}:pokemons:edges:${newPokemon.getDataID()}`,
          'UserPokemonsConnectionEdge',
        );
        newEdge.setLinkedRecord(newPokemon, 'node');
        newEdge.setValue(new Date().toISOString(), 'cursor');

        // Add the new edge to existing edges in viewer's pokemons
        const existingEdges =
          pokemonsConnection.getLinkedRecords('edges') || [];
        pokemonsConnection.setLinkedRecords(
          [...existingEdges, newEdge],
          'edges',
        );

        // Update the caughtPokemons connection of the Pokemon
        const pokemon = store.get(pokemonId);
        if (!pokemon) {
          return;
        }

        let caughtPokemonsConnection =
          pokemon.getLinkedRecord('caughtPokemons');
        if (!caughtPokemonsConnection) {
          caughtPokemonsConnection = store.create(
            `client:${pokemon.getDataID()}:caughtPokemons`,
            'PokemonCaughtPokemonsConnection',
          );
          pokemon.setLinkedRecord(caughtPokemonsConnection, 'caughtPokemons');
        }

        // Create an edge for the caughtPokemons connection
        const newCaughtEdge = store.create(
          `client:${pokemon.getDataID()}:caughtPokemons:edges:${newPokemon.getDataID()}`,
          'PokemonCaughtPokemonsConnectionEdge',
        );
        newCaughtEdge.setLinkedRecord(newPokemon, 'node');
        newCaughtEdge.setValue(new Date().toISOString(), 'cursor');

        // Add the new edge to existing edges in caughtPokemons
        const existingCaughtEdges =
          caughtPokemonsConnection.getLinkedRecords('edges') || [];
        caughtPokemonsConnection.setLinkedRecords(
          [...existingCaughtEdges, newCaughtEdge],
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
