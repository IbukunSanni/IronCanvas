'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, router, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-600">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-sm text-zinc-500">Manage your account settings.</p>
          </div>
          <button
            onClick={() => signOut()}
            className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-semibold"
          >
            Sign out
          </button>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-zinc-900">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold text-zinc-900">User ID:</span> {user.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
