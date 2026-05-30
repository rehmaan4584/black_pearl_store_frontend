'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { loginBuyer, registerBuyer } from '@/lib/auth-api';
import { persistToken } from '@/lib/auth-token';

type AuthMode = 'login' | 'register';

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const isRegister = mode === 'register';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await registerBuyer({ name, email, password });
      }

      const response = await loginBuyer({ email, password });
      persistToken(response.token);
      router.push('/products');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="glass mx-auto max-w-md border-white/5">
      <CardContent className="p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-black text-white">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-sm text-teal-100/50">
            {isRegister
              ? 'Create a buyer account to save your cart and orders.'
              : 'Sign in to continue shopping.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
              minLength={2}
              required
            />
          )}

          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            type="email"
            required
          />

          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            minLength={8}
            required
          />

          {error && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button className="h-12 w-full font-bold" disabled={loading}>
            {loading
              ? 'Please wait...'
              : isRegister
                ? 'Create account'
                : 'Sign in'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-teal-100/50">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link
            href={isRegister ? '/login' : '/register'}
            className="font-bold text-primary hover:underline"
          >
            {isRegister ? 'Sign in' : 'Create one'}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
