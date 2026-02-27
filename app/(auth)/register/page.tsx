'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    const userId = data.user?.id;
    const hasSession = Boolean(data.session);

    if (userId && hasSession) {
      const { error: profileError } = await supabase.from('users').insert({
        id: userId,
        username,
        email,
      });

      if (profileError) {
        setLoading(false);
        setError(profileError.message);
        return;
      }
    }

    setLoading(false);
    if (hasSession) {
      router.push('/dashboard');
      return;
    }

    setSuccess('Check your email to confirm your account, then sign in.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-lg border border-zinc-200 bg-white p-8 shadow-sm"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="text-sm text-zinc-500">Start tracking your practice.</p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-zinc-700">
            Username
            <input
              type="text"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
            />
          </label>

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
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {success ? <p className="text-sm text-emerald-600">{success}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? 'Creating…' : 'Create account'}
        </button>

        <p className="text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <a className="font-semibold text-zinc-900" href="/login">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
