'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useAuth } from '@/components/AuthProvider';
import DashboardShell from '@/components/DashboardShell';
import StatCard from '@/components/StatCard';
import EmptyState from '@/components/EmptyState';
import SubmissionGrid from '@/components/SubmissionGrid';
import type { Submission } from '@/types/submission';
import { supabase } from '@/lib/supabaseClient';

type DashboardData = {
  submissions: Submission[];
  uploads: number;
  critiquesGiven: number;
  critiquesReceived: number;
};

const fetchDashboard = async (userId: string): Promise<DashboardData> => {
  const submissionsQuery = supabase
    .from('submissions')
    .select('id, image_url, exercise_type, created_at, curriculum_source, lesson_number')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  const [{ data: submissions, error: submissionsError }, { count: uploads }, { count: given }] =
    await Promise.all([
      submissionsQuery,
      supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('critiques').select('*', { count: 'exact', head: true }).eq('reviewer_id', userId),
    ]);

  if (submissionsError) {
    throw submissionsError;
  }

  const submissionIds = (submissions ?? []).map((submission) => submission.id);
  const critiquesReceived = submissionIds.length
    ? (
        await supabase
          .from('critiques')
          .select('*', { count: 'exact', head: true })
          .in('submission_id', submissionIds)
      ).count ?? 0
    : 0;

  return {
    submissions: submissions ?? [],
    uploads: uploads ?? 0,
    critiquesGiven: given ?? 0,
    critiquesReceived,
  };
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, router, user]);

  const { data, error } = useSWR(user ? ['dashboard', user.id] : null, () =>
    user ? fetchDashboard(user.id) : Promise.resolve(null),
  );

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
      <DashboardShell title="Dashboard" subtitle="Unable to load data.">
        <EmptyState
          title="Dashboard unavailable"
          description="We couldn't load your data yet. Check your Supabase setup and try again."
          action={
            <a
              href="/submit"
              className="inline-flex rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Upload new artwork
            </a>
          }
        />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title="Dashboard"
      subtitle={`Signed in as ${user.email ?? 'unknown'}`}
      actions={
        <button
          onClick={() => signOut()}
          className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-semibold"
        >
          Sign out
        </button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Uploads"
          value={`${data?.uploads ?? 0}`}
          helper={data?.uploads ? undefined : 'Start by adding a submission.'}
        />
        <StatCard label="Critiques given" value={`${data?.critiquesGiven ?? 0}`} />
        <StatCard label="Critiques received" value={`${data?.critiquesReceived ?? 0}`} />
        <StatCard label="Current streak" value="0 days" helper="Streaks land next." />
      </div>

      {data?.submissions && data.submissions.length > 0 ? (
        <SubmissionGrid submissions={data.submissions} />
      ) : (
        <EmptyState
          title="No submissions yet"
          description="Upload your first practice piece to start tracking progress."
          action={
            <a
              href="/submit"
              className="inline-flex rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Upload new artwork
            </a>
          }
        />
      )}
    </DashboardShell>
  );
}
