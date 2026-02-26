'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabaseClient';

type Profile = {
  id: string;
  username: string;
  email: string;
  avatar_url: string | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, router, user]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setProfileLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('users')
        .select('id, username, email, avatar_url')
        .eq('id', user.id)
        .single();

      if (fetchError) {
        setError(fetchError.message);
        setProfileLoading(false);
        return;
      }

      setProfile(data);
      setAvatarUrl(data.avatar_url ?? '');
      setProfileLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    setSaving(true);
    setError(null);

    const { error: updateError } = await supabase
      .from('users')
      .update({ avatar_url: avatarUrl || null })
      .eq('id', user.id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    setProfile((prev) => (prev ? { ...prev, avatar_url: avatarUrl || null } : prev));
    setSaving(false);
  };

  if (loading || profileLoading) {
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

        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="h-20 w-20 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
              {profile?.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatar_url}
                  alt="Profile avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-zinc-500">
                  No photo
                </div>
              )}
            </div>

            <div className="space-y-1 text-sm text-zinc-600">
              <p>
                <span className="font-semibold text-zinc-900">Email:</span> {profile?.email ?? user.email}
              </p>
              <p>
                <span className="font-semibold text-zinc-900">Username:</span>{' '}
                {profile?.username ?? '—'}
              </p>
              <p>
                <span className="font-semibold text-zinc-900">User ID:</span> {user.id}
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="rounded-lg border border-zinc-200 bg-white p-6 text-sm text-zinc-600"
        >
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-zinc-900">Profile photo</h2>
            <p className="text-xs text-zinc-500">Paste an image URL for now.</p>
          </div>

          <label className="mt-4 block text-sm font-medium text-zinc-700">
            Avatar URL
            <input
              type="url"
              value={avatarUrl}
              onChange={(event) => setAvatarUrl(event.target.value)}
              placeholder="https://"
              className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
            />
          </label>

          {error ? <p className="mt-3 text-xs text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={saving}
            className="mt-4 rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save photo'}
          </button>
        </form>
      </div>
    </div>
  );
}
