export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-16 text-zinc-900">
      <main className="w-full max-w-2xl space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Iron Canvas
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Practice. Upload. Critique. Track.
          </h1>
          <p className="text-lg text-zinc-600">
            A simple loop for deliberate practice and structured feedback.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white"
            href="/register"
          >
            Create account
          </a>
          <a
            className="rounded-md border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-800"
            href="/login"
          >
            Sign in
          </a>
          <a
            className="rounded-md border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-800"
            href="/dashboard"
          >
            View dashboard
          </a>
        </div>
      </main>
    </div>
  );
}
