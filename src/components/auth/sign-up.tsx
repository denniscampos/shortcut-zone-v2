import z from 'zod';
import { useAppForm } from '@/hooks/demo.form';
import { signUp } from '@/lib/auth/auth-client';

const signUpSchema = z.object({
  name: z
    .string({ error: 'Name is required' })
    .min(1, { error: 'Name requires at least 1 character' }),
  email: z.email({ error: 'Invalid email address' }),
  password: z
    .string({ error: 'Password is required' })
    .min(8, { error: 'Password must be at least 8 characters long' }),
});

export function SignUp() {
  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: ({ value }) => {
      signUp.email({
        email: value.email,
        password: value.password,
        name: value.name,
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
      <form.AppField
        name="name"
        children={(field) => {
          return <field.TextField label="Name" placeholder="Name" />;
        }}
      />
      <form.AppField
        name="email"
        children={(field) => {
          return <field.TextField label="Email" placeholder="Email" />;
        }}
      />
      <form.AppField
        name="password"
        children={(field) => {
          return (
            <field.TextField
              label="Password"
              placeholder="Password"
              type="password"
            />
          );
        }}
      />

      <form.AppForm>
        <form.SubmitButton label="Sign Up" />
      </form.AppForm>
    </form>
  );
}
