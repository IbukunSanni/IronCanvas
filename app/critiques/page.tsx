'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useAuth } from '@/components/AuthProvider';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import CritiqueList from '@/components/CritiqueList';
import type { Critique } from '@/types/critique';
import { supabase } from '@/lib/supabaseClient';

type CritiqueOverview = {
  given: Critique[];
  received: Critique[];
};

const fetchCritiques = async (userId: string): Promise<CritiqueOverview> => {
  const { data: given, error: givenError } = await supabase
    .from('critiques')
    .select(
      'id, submission_id, reviewer_id, what_works, what_to_improve, next_focus, created_at, reviewer:users(username, avatar_url)',
    )
    .eq('reviewer_id', userId)
    .order('created_at', { ascending: false });

  if (givenError) {
    throw givenError;
  }

  const { data: submissions, error: submissionsError } = await supabase
    .from('submissions')
    .select('id')
    .eq('user_id', userId);

  if (submissionsError) {
    throw submissionsError;
  }

  const submissionIds = (submissions ?? []).map((submission) => submission.id);
  const { data: received, error: receivedError } = submissionIds.length
    ? await supabase
        .from('critiques')
        .select(
          'id, submission_id, reviewer_id, what_works, what_to_improve, next_focus, created_at, reviewer:users(username, avatar_url)',
        )
        .in('submission_id', submissionIds)
        .order('created_at', { ascending: false })
    : { data: [], error: null };

  if (receivedError) {
    throw receivedError;
  }

  return {
    given: (given ?? []) as Critique[],
    received: (received ?? []) as Critique[],
  };
};

export default function CritiquesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<'given' | 'received'>('given');

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, router, user]);

  const { data, error, mutate } = useSWR(user ? ['critiques', user.id] : null, () =>
    user ? fetchCritiques(user.id) : Promise.resolve(null),
  );

  const currentList = useMemo(() => {
    if (!data) return [];
    return tab === 'given' ? data.given : data.received;
  }, [data, tab]);

  const handleDelete = async (critiqueId: string) => {
    await supabase.from('critiques').delete().eq('id', critiqueId);
    await mutate();
  };

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

  if (error) {
    return (
      <DashboardShell title="My critiques" subtitle="Unable to load critiques.">
        <EmptyState
          title="Critiques unavailable"
          description="We couldn't load your critiques yet."
          action={
            <a
              href="/dashboard"
              className="inline-flex rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Back to dashboard
            </a>
          }
        />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title="My critiques"
      subtitle="Track critiques you have given and received."
      actions={
        <a
          href="/dashboard"
          className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-semibold"
        >
          Back
        </a>
      }
    >
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setTab('given')}
          className={`rounded-md px-4 py-2 text-sm font-semibold ${
            tab === 'given' ? 'bg-zinc-900 text-white' : 'border border-zinc-200 text-zinc-700'
          }`}
        >
          Given
        </button>
        <button
          onClick={() => setTab('received')}
          className={`rounded-md px-4 py-2 text-sm font-semibold ${
            tab === 'received' ? 'bg-zinc-900 text-white' : 'border border-zinc-200 text-zinc-700'
          }`}
        >
          Received
        </button>
      </div>

      <CritiqueList
        critiques={currentList}
        currentUserId={user.id}
        onDelete={tab === 'given' ? handleDelete : undefined}
        emptyMessage={tab === 'given' ? 'You have not written any critiques yet.' : 'No critiques received yet.'}
      />
    </DashboardShell>
  );
}
