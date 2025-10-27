import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from './ui/button';
import { signOut } from '@/lib/auth/auth-client';

export function Header({ user }: { user: string | null }) {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    navigate({ to: '/sign-in' });
  };
  return (
    <header className="p-4 border border-b-gray-200 flex justify-between items-center">
      <h1>
        <Link to="/" className="text-2xl font-bold">
          Shortcut Zone
        </Link>
      </h1>

      <div>
        {user ? (
          <Button onClick={handleSignOut}>Sign out</Button>
        ) : (
          <Button asChild>
            <Link to="/sign-in">Sign in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
