'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { graphql, useFragment, useMutation } from 'react-relay';
import { z } from 'zod';
import type { editPokemonForm_pokemon$key } from '~/__generated__/editPokemonForm_pokemon.graphql';
import type { editPokemonFormUpdatePokemonMutation } from '~/__generated__/editPokemonFormUpdatePokemonMutation.graphql';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  primaryType: z.string().min(1, 'Primary type is required'),
  secondaryType: z.string().optional(),
});

const POKEMON_TYPES = [
  'Normal',
  'Fire',
  'Water',
  'Electric',
  'Grass',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
  'Fairy',
] as const;

type Props = Readonly<{
  pokemon: editPokemonForm_pokemon$key;
}>;

export function EditPokemonForm({ pokemon }: Props) {
  const router = useRouter();
  const data = useFragment(
    graphql`
      fragment editPokemonForm_pokemon on Pokemon {
        id
        name
        primaryType
        secondaryType
      }
    `,
    pokemon,
  );

  const [commitUpdatePokemon] =
    useMutation<editPokemonFormUpdatePokemonMutation>(graphql`
    mutation editPokemonFormUpdatePokemonMutation($input: UpdatePokemonInput!) {
      updatePokemon(input: $input) {
          id
          name
          primaryType
          secondaryType
      }
    }
  `);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      primaryType: data.primaryType,
      secondaryType: data.secondaryType ?? undefined,
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      commitUpdatePokemon({
        variables: {
          input: {
            id: data.id,
            name: values.name,
            primaryType: values.primaryType,
            secondaryType: values.secondaryType,
          },
        },
        onCompleted: () => {
          router.push(`/pokemons/${data.id}`);
        },
      });
    },
    [commitUpdatePokemon, data.id, router],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="primaryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {POKEMON_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="secondaryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select secondary type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {POKEMON_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </Form>
  );
}
