'use client';

import useSWR from 'swr';
import { supabase } from '@/lib/supabaseClient';

type PropsButtonProps = {
  submissionId: string;
  userId: string;
};

type PropsState = {
  count: number;
  hasPropped: boolean;
};

const fetchProps = async (submissionId: string, userId: string): Promise<PropsState> => {
  const [{ count }, { data }] = await Promise.all([
    supabase
      .from('props')
      .select('*', { count: 'exact', head: true })
      .eq('submission_id', submissionId),
    supabase
      .from('props')
      .select('id')
      .eq('submission_id', submissionId)
      .eq('giver_id', userId)
      .maybeSingle(),
  ]);

  return {
    count: count ?? 0,
    hasPropped: Boolean(data?.id),
  };
};

export default function PropsButton({ submissionId, userId }: PropsButtonProps) {
  const { data, mutate, isLoading } = useSWR(['props', submissionId, userId], () =>
    fetchProps(submissionId, userId),
  );

  const handleToggle = async () => {
    if (!data) return;

    if (data.hasPropped) {
      await supabase
        .from('props')
        .delete()
        .eq('submission_id', submissionId)
        .eq('giver_id', userId);
    } else {
      await supabase.from('props').insert({ submission_id: submissionId, giver_id: userId });
    }

    mutate();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-semibold ${
        data?.hasPropped
          ? 'border-zinc-900 bg-zinc-900 text-white'
          : 'border-zinc-200 text-zinc-700'
      }`}
    >
      <span>+1 Prop</span>
      <span className="text-xs">{data?.count ?? 0}</span>
    </button>
  );
}
