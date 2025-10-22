import PokemonEditPage from '~/components/pokemon-edit-page';

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <PokemonEditPage id={id} />;
}
