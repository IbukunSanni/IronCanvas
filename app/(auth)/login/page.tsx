'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const { error: signInError } = useMagicLink
      ? await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        })
      : await supabase.auth.signInWithPassword({
          email,
          password,
        });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    if (useMagicLink) {
      setMessage('Check your email for the magic link.');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-lg border border-zinc-200 bg-white p-8 shadow-sm"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-zinc-500">Access your critique dashboard.</p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-zinc-700">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
            />
          </label>

          {!useMagicLink ? (
            <label className="block text-sm font-medium text-zinc-700">
              Password
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
              />
            </label>
          ) : null}
        </div>

        <label className="flex items-center gap-2 text-sm text-zinc-600">
          <input
            type="checkbox"
            checked={useMagicLink}
            onChange={(event) => setUseMagicLink(event.target.checked)}
            className="h-4 w-4 rounded border-zinc-300"
          />
          Use magic link instead of password
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {message ? <p className="text-sm text-emerald-600">{message}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? 'Signing in…' : useMagicLink ? 'Send magic link' : 'Sign in'}
        </button>

        <p className="text-center text-sm text-zinc-500">
          No account?{' '}
          <a className="font-semibold text-zinc-900" href="/register">
            Create one
          </a>
        </p>

        <p className="text-center text-sm text-zinc-500">
          Need a password?{' '}
          <a className="font-semibold text-zinc-900" href="/set-password">
            Set one
          </a>
        </p>
      </form>
    </div>
  );
}
