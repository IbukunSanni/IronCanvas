import Link from 'next/link';
import type { Submission } from '@/types/submission';

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export default function SubmissionCard({ submission }: { submission: Submission }) {
  return (
    <Link
      href={`/submissions/${submission.id}`}
      className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={submission.image_url}
        alt={submission.exercise_type}
        className="h-44 w-full object-cover"
      />
      <div className="space-y-1 p-4 text-sm">
        <p className="font-semibold text-zinc-900">{submission.exercise_type}</p>
        <p className="text-xs text-zinc-500">Uploaded {formatDate(submission.created_at)}</p>
        {submission.curriculum_source ? (
          <p className="text-xs text-zinc-500">
            {submission.curriculum_source}
            {submission.lesson_number ? ` · Lesson ${submission.lesson_number}` : ''}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
