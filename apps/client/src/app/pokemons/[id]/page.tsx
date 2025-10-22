import PokemonDetailPage from '~/components/pokemon-detail-page';

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <PokemonDetailPage id={id} />;
}
