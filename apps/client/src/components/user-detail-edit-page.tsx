'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { z } from 'zod';
import type { userDetailEditPageMutation } from '~/__generated__/userDetailEditPageMutation.graphql';
import type { userDetailEditPageQuery } from '~/__generated__/userDetailEditPageQuery.graphql';
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

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z
    .string()
    .min(1, 'Username is required')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and hyphens',
    ),
});

export default function UserDetailEditPage() {
  const router = useRouter();
  const data = useLazyLoadQuery<userDetailEditPageQuery>(
    graphql`
      query userDetailEditPageQuery {
        viewer {
          id
          name
          username
        }
      }
    `,
    {},
  );

  const [commitUpdateProfile, isUpdating] =
    useMutation<userDetailEditPageMutation>(
      graphql`
      mutation userDetailEditPageMutation($input: UpdateUserInput!) {
        updateUser(input: $input) {
         ... on User {
                id
                username
                name
                email
            }
            ... on ErrorResult {
                code
                message
            }
        }
      }
    `,
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.viewer?.name ?? '',
      username: data.viewer?.username ?? '',
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      if (!data.viewer) return;

      commitUpdateProfile({
        variables: {
          input: {
            id: data.viewer.id,
            ...values,
          },
        },
        onCompleted: ({ updateUser }) => {
          if (updateUser && 'message' in updateUser) {
            form.setError('root', {
              message: updateUser.message,
            });
            return;
          }
          router.push('/me');
        },
        onError: (error) => {
          form.setError('root', {
            message: error.message,
          });
        },
      });
    },
    [commitUpdateProfile, data.viewer, form, router],
  );

  if (!data.viewer) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
        <h3 className="text-lg font-semibold">Not signed in</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You need to be signed in to edit your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
        <h1 className="text-2xl font-semibold">Edit Profile</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
                <div className="text-sm text-red-700 dark:text-red-200">
                  {form.formState.errors.root.message}
                </div>
              </div>
            )}
            <div className="flex items-center justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
