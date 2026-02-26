'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useAuth } from '@/components/AuthProvider';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import type { Submission } from '@/types/submission';
import { supabase } from '@/lib/supabaseClient';

type SubmissionDetail = Submission & {
  user_id: string;
};

const fetchSubmission = async (id: string) => {
  const { data, error } = await supabase
    .from('submissions')
    .select('id, user_id, image_url, exercise_type, created_at, curriculum_source, lesson_number')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data as SubmissionDetail;
};

export default function SubmissionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, router, user]);

  const { data, error } = useSWR(user ? ['submission', params.id] : null, () =>
    user ? fetchSubmission(params.id) : Promise.resolve(null),
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
      <DashboardShell title="Submission" subtitle="Unable to load submission.">
        <EmptyState
          title="Submission unavailable"
          description="We couldn't load this submission. It may have been removed."
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

  if (!data) {
    return null;
  }

  return (
    <DashboardShell
      title="Submission"
      subtitle={`Exercise: ${data.exercise_type}`}
      actions={
        <a
          href="/dashboard"
          className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-semibold"
        >
          Back
        </a>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image_url}
            alt={data.exercise_type}
            className="w-full rounded-md object-contain"
          />
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
            <p>
              <span className="font-semibold text-zinc-900">Exercise:</span> {data.exercise_type}
            </p>
            <p>
              <span className="font-semibold text-zinc-900">Uploaded:</span>{' '}
              {new Date(data.created_at).toLocaleDateString()}
            </p>
            {data.curriculum_source ? (
              <p>
                <span className="font-semibold text-zinc-900">Curriculum:</span>{' '}
                {data.curriculum_source}
                {data.lesson_number ? ` · Lesson ${data.lesson_number}` : ''}
              </p>
            ) : null}
          </div>

          <div className="rounded-lg border border-dashed border-zinc-200 bg-white p-4 text-sm text-zinc-500">
            Critiques will display here next.
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
