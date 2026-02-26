import type { Submission } from '@/types/submission';
import SubmissionCard from '@/components/SubmissionCard';

export default function SubmissionGrid({ submissions }: { submissions: Submission[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {submissions.map((submission) => (
        <SubmissionCard key={submission.id} submission={submission} />
      ))}
    </div>
  );
}
