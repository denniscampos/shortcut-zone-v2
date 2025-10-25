import { createFileRoute } from '@tanstack/react-router';
import { signUp, useSession } from '@/lib/auth/auth-client';
import { useTRPC } from '@/integrations/trpc/react';
import { useQuery } from '@tanstack/react-query';
import { SignUp } from '@/components/sign-up';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const session = useSession();
  const trpc = useTRPC();
  const { data: emailFromTRPC } = useQuery({
    ...trpc.user.currentUser.queryOptions(),
  });
  console.log({ session, emailFromTRPC: emailFromTRPC?.email });
  return (
    <div>
      <p>Shortcut Zone is actively being worked on. Please check back later.</p>
      <SignUp />

      <form>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button
          onClick={(e) => {
            e.preventDefault();
            signUp.email({
              email: 'test@test.com',
              password: 'test123456',
              name: 'Test User',
            });
          }}
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
