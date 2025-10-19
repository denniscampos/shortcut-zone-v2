import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { trpcRouter } from '@/integrations/trpc/router';
import { createFileRoute } from '@tanstack/react-router';
import { createContext } from '@/integrations/trpc/init';

function handler({ request }: { request: Request }) {
  return fetchRequestHandler({
    req: request,
    router: trpcRouter,
    endpoint: '/api/trpc',
    createContext: async (opts) => {
      return createContext({
        ...opts,
        req: request,
        res: undefined,
      });
    },
  });
}

export const Route = createFileRoute('/api/trpc/$')({
  server: {
    handlers: {
      GET: handler,
      POST: handler,
    },
  },
});
