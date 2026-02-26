'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { uploadArtwork } from '@/lib/storage';
import { useAuth } from '@/components/AuthProvider';

const exerciseOptions = ['Boxes', 'Ellipses', 'Figures', 'Other'];

export default function UploadForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [exerciseType, setExerciseType] = useState(exerciseOptions[0]);
  const [file, setFile] = useState<File | null>(null);
  const [curriculumSource, setCurriculumSource] = useState('');
  const [lessonNumber, setLessonNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
        />
      </label>

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

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? 'Uploading…' : 'Upload'}
      </button>
    </form>
  );
}
