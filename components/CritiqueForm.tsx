'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/components/AuthProvider';

type CritiqueFormProps = {
  submissionId: string;
  onCreated?: () => void;
};

export default function CritiqueForm({ submissionId, onCreated }: CritiqueFormProps) {
  const { user } = useAuth();
  const [whatWorks, setWhatWorks] = useState('');
  const [whatToImprove, setWhatToImprove] = useState('');
  const [nextFocus, setNextFocus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      setError('You must be signed in to critique.');
      return;
    }

    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase.from('critiques').insert({
      submission_id: submissionId,
      reviewer_id: user.id,
      what_works: whatWorks,
      what_to_improve: whatToImprove,
      next_focus: nextFocus,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    setWhatWorks('');
    setWhatToImprove('');
    setNextFocus('');
    setLoading(false);
    onCreated?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-zinc-900">Leave a critique</h2>
        <p className="text-sm text-zinc-500">Be specific and constructive.</p>
      </div>

      <div className="mt-4 space-y-4">
        <label className="block text-sm font-medium text-zinc-700">
          What works well
          <textarea
            required
            rows={3}
            value={whatWorks}
            onChange={(event) => setWhatWorks(event.target.value)}
            className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
          />
        </label>

        <label className="block text-sm font-medium text-zinc-700">
          What to improve
          <textarea
            required
            rows={3}
            value={whatToImprove}
            onChange={(event) => setWhatToImprove(event.target.value)}
            className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
          />
        </label>

        <label className="block text-sm font-medium text-zinc-700">
          Next focus area
          <textarea
            required
            rows={2}
            value={nextFocus}
            onChange={(event) => setNextFocus(event.target.value)}
            className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
          />
        </label>
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? 'Submitting…' : 'Submit critique'}
      </button>
    </form>
  );
}
