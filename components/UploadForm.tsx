'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { supabase } from '@/lib/supabaseClient';
import { uploadArtwork } from '@/lib/storage';
import { useAuth } from '@/components/AuthProvider';

const exerciseOptions = ['Boxes', 'Ellipses', 'Figures', 'Other'];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

type CreditData = {
  uploads: number;
  critiquesGiven: number;
};

const fetchCredits = async (userId: string): Promise<CreditData> => {
  const [{ count: uploads }, { count: critiquesGiven }] = await Promise.all([
    supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('critiques').select('*', { count: 'exact', head: true }).eq('reviewer_id', userId),
  ]);

  return {
    uploads: uploads ?? 0,
    critiquesGiven: critiquesGiven ?? 0,
  };
};

export default function UploadForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [exerciseType, setExerciseType] = useState(exerciseOptions[0]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [curriculumSource, setCurriculumSource] = useState('');
  const [lessonNumber, setLessonNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: creditData, isLoading: creditsLoading } = useSWR(
    user ? ['credits', user.id] : null,
    () => (user ? fetchCredits(user.id) : Promise.resolve(null)),
  );

  const creditsAvailable = useMemo(() => {
    const critiquesGiven = creditData?.critiquesGiven ?? 0;
    const uploads = creditData?.uploads ?? 0;
    return Math.max(0, critiquesGiven - uploads);
  }, [creditData]);

  const hasFreeUpload = (creditData?.uploads ?? 0) === 0;
  const canUpload = hasFreeUpload || creditsAvailable > 0;

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setError(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      setFile(null);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setError(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB.`);
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!user) {
      setError('You must be signed in to upload.');
      return;
    }

    if (!file) {
      setError('Select an image to upload.');
      return;
    }

    if (creditsLoading) {
      setError('Loading your critique credits. Try again in a moment.');
      return;
    }

    if (!canUpload) {
      setError('Earn a critique credit before uploading again.');
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadArtwork(file, user.id);

      const { error: insertError } = await supabase.from('submissions').insert({
        user_id: user.id,
        image_url: imageUrl,
        exercise_type: exerciseType,
        curriculum_source: curriculumSource || null,
        lesson_number: lessonNumber ? Number(lessonNumber) : null,
      });

      if (insertError) {
        throw insertError;
      }

      router.push('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Upload artwork</h1>
        <p className="text-sm text-zinc-500">Share a practice submission.</p>
      </div>

      <label className="block text-sm font-medium text-zinc-700">
        Exercise type
        <select
          value={exerciseType}
          onChange={(event) => setExerciseType(event.target.value)}
          className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
        >
          {exerciseOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-medium text-zinc-700">
        Image file
        <input
          type="file"
          accept="image/*"
          required
          onChange={handleFileChange}
          className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
        />
        <p className="mt-2 text-xs text-zinc-500">Max file size: {MAX_FILE_SIZE_MB}MB.</p>
      </label>

      {previewUrl ? (
        <div className="rounded-lg border border-dashed border-zinc-200 bg-white p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Preview
          </p>
          <img
            src={previewUrl}
            alt="Artwork preview"
            className="max-h-64 w-full rounded-md object-contain"
          />
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-zinc-700">
          Curriculum source (optional)
          <input
            type="text"
            value={curriculumSource}
            onChange={(event) => setCurriculumSource(event.target.value)}
            className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
          />
        </label>

        <label className="block text-sm font-medium text-zinc-700">
          Lesson number (optional)
          <input
            type="number"
            min="1"
            value={lessonNumber}
            onChange={(event) => setLessonNumber(event.target.value)}
            className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
          />
        </label>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
        <p className="font-semibold">Critique credits</p>
        <p className="mt-1 text-xs text-zinc-600">
          {creditsLoading
            ? 'Loading credits…'
            : `Available: ${creditsAvailable}${hasFreeUpload ? ' (first upload is free)' : ''}`}
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          Each critique you give earns 1 credit. Uploads cost 1 credit after your first post.
        </p>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={loading || creditsLoading || !canUpload}
        className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? 'Uploading…' : 'Upload'}
      </button>

      {loading ? (
        <p className="text-center text-xs text-zinc-500">Uploading your artwork…</p>
      ) : null}
    </form>
  );
}
