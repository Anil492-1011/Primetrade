import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, signupSchema } from '../../schemas/authSchema';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';

const roles = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Student', value: 'Student' },
  { label: 'Visitor', value: 'Visitor' },
];

export const AuthForm = ({ type = 'login', onSubmit, serverError, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const schema = type === 'login' ? loginSchema : signupSchema;
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'Student',
    },
  });

  const submitHandler = (values) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
        {type === 'signup' && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Alex Mercer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@company.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} placeholder="********" {...field} />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {type === 'signup' && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-3 gap-2">
                    {roles.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        className={cn(
                          'rounded-xl border px-3 py-2 text-sm font-medium transition',
                          field.value === role.value ? 'border-primary bg-primary/10 text-primary' : 'text-muted-foreground'
                        )}
                        onClick={() => field.onChange(role.value)}
                      >
                        {role.label}
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {serverError && <p className="text-sm font-medium text-destructive">{serverError}</p>}

        <Button type="submit" className="w-full gap-2" disabled={loading}>
          {loading ? 'Please wait...' : type === 'login' ? 'Sign in' : 'Create account'}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>
    </Form>
  );
};

