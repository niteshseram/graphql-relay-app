import PokemonsListing from '~/components/PokemonsListing';
export default function PokemonsPage() {
  return (
    <div className="mx-auto max-w-[1200px] p-4">
      <h1 className="mb-4 text-2xl font-bold">Pokemon Listing</h1>
      <PokemonsListing />
    </div>
  );
}
