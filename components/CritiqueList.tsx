'use client';

import type { Critique } from '@/types/critique';

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

type CritiqueListProps = {
  critiques: Critique[];
  emptyMessage?: string;
  currentUserId?: string;
  onDelete?: (critiqueId: string) => Promise<void> | void;
};

export default function CritiqueList({
  critiques,
  emptyMessage = 'No critiques yet. Be the first to leave feedback.',
  currentUserId,
  onDelete,
}: CritiqueListProps) {
  if (!critiques.length) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-200 bg-white p-4 text-sm text-zinc-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {critiques.map((critique) => (
        <div key={critique.id} className="rounded-lg border border-zinc-200 bg-white p-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
                {critique.reviewer?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={critique.reviewer.avatar_url}
                    alt={critique.reviewer.username}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {critique.reviewer_id === currentUserId
                  ? 'You'
                  : critique.reviewer?.username ?? 'Anonymous'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {formatDate(critique.created_at)}
              </p>
              {currentUserId && critique.reviewer_id === currentUserId && onDelete ? (
                <button
                  type="button"
                  onClick={() => onDelete(critique.id)}
                  className="text-xs font-semibold text-zinc-500 hover:text-zinc-900"
                >
                  Delete
                </button>
              ) : null}
            </div>
          </div>
          <div className="mt-3 space-y-2 text-zinc-700">
            <p>
              <span className="font-semibold text-zinc-900">What works:</span> {critique.what_works}
            </p>
            <p>
              <span className="font-semibold text-zinc-900">Improve:</span> {critique.what_to_improve}
            </p>
            <p>
              <span className="font-semibold text-zinc-900">Next focus:</span> {critique.next_focus}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
