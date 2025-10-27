import { createMiddleware } from '@tanstack/react-start';
import { getSession } from './auth-client';
import { getRequestHeaders } from '@tanstack/react-start/server';

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const { data: session } = await getSession({
    fetchOptions: {
      headers: getRequestHeaders() as HeadersInit,
    },
  });
  return await next({
    context: {
      user: {
        id: session?.user?.id,
        name: session?.user?.name,
        image: session?.user?.image,
      },
    },
  });
});
