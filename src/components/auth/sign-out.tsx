import { signOut } from '@/lib/auth/auth-client';
import { Button } from '../ui/button';

export function SignOut() {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
}
