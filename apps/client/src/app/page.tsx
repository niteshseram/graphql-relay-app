import PokemonsListing from '~/components/pokemon-listing';

export default function PokemonsPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Pokemons</h1>
      <PokemonsListing />
    </div>
  );
}
