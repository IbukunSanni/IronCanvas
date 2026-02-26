# Iron Canvas

> A unified artist growth platform for deliberate practice, structured critique, and progress tracking.

**Core Loop**: Practice → Upload → Critique → Track

## What it is

Iron Canvas helps artists upload practice work, receive focused critiques, and track improvement over time.

## Phase 1 Stack (Locked)

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* SWR
* Supabase
* Vercel

## Project Resources

* [docs/TODO.md](docs/TODO.md)
* [docs/KNOWLEDGEBASE.md](docs/KNOWLEDGEBASE.md)

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SMTP_HOST` (Mailtrap)
- `SMTP_PORT` (Mailtrap)
- `SMTP_USERNAME` (Mailtrap)
- `SMTP_PASSWORD` (Mailtrap)

## Getting Started (Developers)

Clone, install, and run:

```bash
git clone https://github.com/IbukunSanni/IronCanvas.git
cd IronCanvas
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables
- `MAILTRAP_TOKEN` (set in `.env.local`, never commit; secrets can leak via git/builds)
- `SMTP_HOST` (e.g., `sandbox.smtp.mailtrap.io`)
- `SMTP_PORT` (e.g., `587`)
- `SMTP_USERNAME` (set in `.env.local`)
- `SMTP_PASSWORD` (set in `.env.local`)
