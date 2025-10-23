import prisma from '../../prisma/prisma.tsx';
import builder from '../builder.tsx';
import User from '../nodes/User.tsx';

const UpdateUserInput = builder.inputType('UpdateUserInput', {
  fields: (t) => ({
    id: t.id({ required: true }),
    name: t.string(),
    username: t.string(),
  }),
});

const ErrorResult = builder.objectRef<{ code: string; message: string }>(
  'ErrorResult',
);
ErrorResult.implement({
  fields: (t) => ({
    code: t.exposeString('code', { nullable: false }),
    message: t.exposeString('message', { nullable: false }),
  }),
});

const UpdateUserResult = builder.unionType('UpdateUserResult', {
  types: [User, ErrorResult],
  resolveType: (value) => {
    if ('code' in value && 'message' in value) {
      return ErrorResult;
    }
    return User;
  },
});

builder.mutationFields((t) => ({
  updateUser: t.field({
    type: UpdateUserResult,
    args: {
      input: t.arg({ type: UpdateUserInput, required: true }),
    },
    authScopes: {
      role: 'user',
    },
    resolve: async (_parent, { input }, { sessionUser }) => {
      if (!sessionUser) {
        return {
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to update a user',
        };
      }
      const sessionUserId = `user_${sessionUser.id}`;
      // Ensure users can only update their own profile
      if (sessionUserId !== input.id) {
        return {
          code: 'FORBIDDEN',
          message: 'You do not have permission to update this user',
        };
      }

      // Validate username uniqueness if it's being changed
      if (input.username) {
        const existingUser = await prisma.user.findUnique({
          where: { username: input.username },
        });
        if (existingUser && existingUser.id !== sessionUser.id) {
          return {
            code: 'USERNAME_TAKEN',
            message: 'Username is already taken',
          };
        }
      }

      return prisma.user.update({
        where: { id: sessionUser.id },
        data: {
          name: input.name || undefined,
          username: input.username || undefined,
        },
      });
    },
  }),
}));
