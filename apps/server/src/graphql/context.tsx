import type { SessionUser } from '../user/SessionUser.tsx';

export type Context = Readonly<{
  sessionUser: SessionUser | null;
}>;
