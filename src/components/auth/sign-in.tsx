import { useAppForm } from '@/hooks/demo.form';
import { signIn } from '@/lib/auth/auth-client';
import z from 'zod';

const signInSchema = z.object({
  email: z.email({ error: 'Invalid email address' }),
  password: z
    .string({ error: 'Password is required' })
    .min(8, { error: 'Password must be at least 8 characters long' }),
});

export function SignIn() {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      await signIn.email({
        email: value.email,
        password: value.password,
      });
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField name="email">
        {(field) => <field.TextField label="Email" />}
      </form.AppField>
      <form.AppField name="password">
        {(field) => <field.TextField label="Password" />}
      </form.AppField>
      <form.AppForm>
        <form.SubmitButton label="Sign In" />
      </form.AppForm>
    </form>
  );
}
