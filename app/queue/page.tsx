'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useAuth } from '@/components/AuthProvider';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SubmissionGrid from '@/components/SubmissionGrid';
import type { Submission } from '@/types/submission';
import { supabase } from '@/lib/supabaseClient';

type QueueRow = Submission & {
  critiques?: { count: number }[] | { count: number } | null;
};

type QueueData = {
  submissions: Submission[];
};

const getCritiqueCount = (row: QueueRow) => {
  const { critiques } = row;
  if (!critiques) return 0;
  if (Array.isArray(critiques)) {
    return critiques[0]?.count ?? 0;
  }
  return critiques.count ?? 0;
};

const fetchQueue = async (userId: string): Promise<QueueData> => {
  const { data, error } = await supabase
    .from('submissions')
    .select('id, image_url, exercise_type, created_at, curriculum_source, lesson_number, critiques(count)')
    .neq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  const submissions = (data ?? [])
    .filter((row) => getCritiqueCount(row as QueueRow) === 0)
    .map((row) => ({
      id: row.id,
      image_url: row.image_url,
      exercise_type: row.exercise_type,
      created_at: row.created_at,
      curriculum_source: row.curriculum_source,
      lesson_number: row.lesson_number,
    }));

  return { submissions };
};

export default function QueuePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, router, user]);

  const { data, error } = useSWR(user ? ['queue', user.id] : null, () =>
    user ? fetchQueue(user.id) : Promise.resolve(null),
  );

  const queueItems = useMemo(() => data?.submissions ?? [], [data]);

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
      <DashboardShell title="Critique queue" subtitle="Unable to load the queue.">
        <EmptyState
          title="Queue unavailable"
          description="We couldn't load the queue yet."
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
      title="Critique queue"
      subtitle="Submissions waiting for their first critique."
      actions={
        <a
          href="/dashboard"
          className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-semibold"
        >
          Back
        </a>
      }
    >
      {queueItems.length ? (
        <SubmissionGrid submissions={queueItems} />
      ) : (
        <EmptyState
          title="Queue is clear"
          description="You're all caught up. Check back later for new submissions to critique."
          action={
            <a
              href="/dashboard"
              className="inline-flex rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Back to dashboard
            </a>
          }
        />
      )}
    </DashboardShell>
  );
}
