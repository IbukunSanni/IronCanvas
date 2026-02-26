'use client';

import { useEffect, useMemo, useState } from 'react';
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

  const [exerciseFilter, setExerciseFilter] = useState('All');

  const exerciseOptions = useMemo(() => {
    const types = new Set(data?.submissions?.map((submission) => submission.exercise_type) ?? []);
    return ['All', ...Array.from(types)];
  }, [data]);

  const filteredSubmissions = useMemo(() => {
    if (!data?.submissions) return [];
    if (exerciseFilter === 'All') return data.submissions;
    return data.submissions.filter((submission) => submission.exercise_type === exerciseFilter);
  }, [data, exerciseFilter]);

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
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-zinc-900">Recent submissions</p>
            <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Filter
              <select
                value={exerciseFilter}
                onChange={(event) => setExerciseFilter(event.target.value)}
                className="ml-2 rounded-md border border-zinc-200 px-2 py-1 text-xs text-zinc-700"
              >
                {exerciseOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {filteredSubmissions.length ? (
            <SubmissionGrid submissions={filteredSubmissions} />
          ) : (
            <EmptyState
              title="No submissions for this filter"
              description="Try a different exercise type or upload a new piece."
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
        </div>
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
