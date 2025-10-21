import { auth } from '../../lib/auth.tsx';
import prisma from '../../prisma/prisma.tsx';
import builder from '../builder.tsx';

builder.mutationField('updateName', (t) =>
  t.prismaField({
    args: {
      name: t.arg.string({ required: true }),
    },
    authScopes: {
      role: 'user',
    },
    resolve: async (query, _, { name }, { sessionUser }) => {
      if (!sessionUser) {
        throw new Error('not-authenticated');
      }

      name = name.trim();

      if (name.length < 2 || name.length > 32) {
        throw new Error('invalid-name');
      }

      await auth.api.updateUser({ body: { name } });

      return await prisma.user.findUniqueOrThrow({
        ...query,
        where: {
          id: sessionUser.id,
        },
      });
    },
    type: 'User',
  }),
);
