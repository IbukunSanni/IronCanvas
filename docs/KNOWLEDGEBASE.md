# 🧭 Iron Canvas Knowledge Base

> A living reference designed to keep you focused, disciplined, and consistent.
> Consolidates your roadmap, growth path, and reflection system into one operating manual.

**Structure**: Foundations → Execution System → Phase Guides → Learning Map → Review Framework

---

## **I. Mission Statement**

**Purpose:**
Build a unified artist growth platform that helps creatives practice deliberately, receive structured critiques, and track artistic progress.

**Core Loop:**
**Practice → Upload → Critique → Track**

**Meta Goal:**
Use this project to:

1. **Ship consistently** — fast, working releases.
2. **Learn systematically** — each phase upgrades your stack literacy.
3. **Create lasting proof** — a deployable, evolving product that represents your technical and creative identity.

---

## **II. Core Philosophy**

### 1. **Build → Replace → Scale**

| Stage                 | Focus                              | Output                            | Learning Outcome                |
| --------------------- | ---------------------------------- | --------------------------------- | ------------------------------- |
| **Build (Phase 1)**   | Ship MVP quickly using Supabase    | Functional end-to-end product     | Understand product lifecycle    |
| **Replace (Phase 3)** | Introduce explicit backend & infra | Modular API, CI/CD, observability | Backend, DevOps, cloud fluency  |
| **Scale (Phase 4)**   | Move to industry-grade stack       | Production-grade architecture     | Systems thinking, ops readiness |

### 2. **Learning by Integration**

Never study a tool in isolation.
Each new technology must:

- Replace an existing working piece
- Improve real performance, maintainability, or insight
- Be benchmarked against clear metrics (latency, cost, stability)

### 3. **Execution Rules**

- One working system at all times (MVP must not break)
- Code in **small, testable increments**
- Focus on outcomes, not polish
- Document all major decisions and trade-offs
- Measure → reflect → iterate

---

## **III. Project Spine (What Never Changes)**

### **Persistent Schema**

These tables remain constant across all phases.

| Table           | Purpose                   | Notes                 |
| --------------- | ------------------------- | --------------------- |
| **users**       | identity and profile      | mirrors Supabase auth |
| **submissions** | uploaded artwork          | stores URL + metadata |
| **critiques**   | structured feedback       | 3 text fields         |
| **props**       | lightweight encouragement | prevents self-props   |

Everything else is optional layering. Schema stability ensures forward compatibility.

### **Non-Negotiable Flow**

1. User registers → logs in
2. User uploads artwork
3. Peer leaves critique
4. Dashboard visualizes growth

If this loop ever breaks, all other work pauses until fixed.

---

## **IV. Development Execution System**

### **Daily Cadence**

| Period              | Focus                       | Deliverable             |
| ------------------- | --------------------------- | ----------------------- |
| **Morning (2 h)**   | Core feature coding         | working slice (UI → DB) |
| **Afternoon (2 h)** | Testing + documentation     | proof it works          |
| **Evening (1 h)**   | Reflection + backlog update | 3 bullet takeaways      |

### **Weekly Cycle**

1. **Plan** (Sunday) → define goals for the week (max 3).
2. **Build** (Mon–Fri) → one vertical slice each.
3. **Review** (Saturday) → measure metrics, note blockers, commit learnings.
4. **Reset** → archive logs, prep next sprint.

### **Tracking Tools**

- GitHub Projects → tasks
- docs/TODO.md → notes & progress logs
- Supabase Dashboard → metrics
- Vercel / Render logs → performance tracking

---

## **V. Official Phased Stack**

Each phase has:

- 🎯 Objective
- 🧱 Tech Stack
- 📦 Deliverable
- 🔄 Upgrade Trigger

---

## **Phase 1 — Core Critique Engine (MVP)**

### 🎯 Objective

Ship the working loop:

Practice → Upload → Critique → Track

### 🧱 Tech Stack

**Frontend**

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- SWR (data fetching)

**Backend / Data**

- Supabase
  - Auth
  - Postgres
  - Storage
  - RLS policies

**Hosting**

- Vercel (frontend)
- Supabase (backend + DB + storage)

**No:**

- No FastAPI
- No GraphQL
- No Docker
- No AWS
- No Redis

Keep it flat.

### 📦 Deliverable

- Live deployed app
- Auth works
- Upload works
- Text critique works
- Props work
- Dashboard metrics work
- 1 real user test

### 🔄 Upgrade Trigger

Move to Phase 2 only when:

- MVP deployed
- No critical bugs
- At least 2–3 people used it

---

## **Phase 1.5 — Curriculum Metadata Layer**

### 🎯 Objective

Support Drawabox-style tracking without changing product core.

### 🧱 Tech Stack

Same as Phase 1.

Add only:

- Optional schema fields:
  - curriculum_source
  - lesson_number

UI additions:

- Filter submissions by lesson
- Lesson progress counter

**No:**

- No checklist engine
- No validation logic
- No rubric system

### 📦 Deliverable

- Dashboard filter by lesson
- Simple lesson frequency display

### 🔄 Upgrade Trigger

When users actively tag submissions with curriculum labels.

---

## **Phase 2 — Image Annotation System**

### 🎯 Objective

Enable drawing directly on submissions for critique.

### 🧱 Tech Stack

Add:

* HTML5 Canvas
  OR
* Konva.js (simpler abstraction)

**Database:**

New table:

annotations
  id
  submission_id
  reviewer_id
  stroke_data (JSON)
  created_at

Still:

* Supabase backend
* No custom API

**Hosting:**

Unchanged

### 📦 Deliverable

* Reviewer can draw over image
* Strokes saved as JSON
* Annotation reloads correctly

**No:**

* No realtime
* No multiplayer
* No replay system
* No pressure sensitivity yet

### 🔄 Upgrade Trigger

When annotation feels stable and usable.

---

## **Phase 3 — Compute Layer (Real Backend)**

### 🎯 Objective

Introduce explicit backend service for logic & AI.

### 🧱 Tech Stack

**Backend**

* FastAPI (Python)
  OR
* Express (TypeScript)

**Infra**

* Docker
* Railway or Render hosting

**Data**

* Supabase remains DB + Auth
* Backend uses Service Role key

**Move Logic Into Backend:**

* Streak calculations
* Advanced metrics
* AI critique generation
* Batch processing

### 📦 Deliverable

* All writes pass through backend
* Backend documented (OpenAPI)
* CI/CD working
* Basic unit tests

### 🔄 Upgrade Trigger

When:

* AI added
* Complex multi-step logic needed
* Performance monitoring required

---

## **Phase 4 — Performance & Cloud Hardening**

### 🎯 Objective

Make system production-grade.

### 🧱 Tech Stack Additions

* AWS S3 (optional migration from Supabase Storage)
* Redis (caching)
* CloudFront CDN
* AWS Lambda or background jobs
* PostHog or Grafana
* GitHub Actions CI/CD
* Rate limiting middleware

Optional DB migration:

* AWS RDS (Postgres)

### 📦 Deliverable

* Cached dashboard queries
* Background job system
* Observability dashboard
* Load-tested system

### 🔄 Upgrade Trigger

When:

* 100+ real users
* Storage costs growing
* API latency noticeable

---

## **Phase 5 — Advanced Product Modules**

Only after system stability.

Possible additions:

* Events
* Drawing games (WebSocket server required)
* Mentor tiers
* Marketplace
* Realtime critique sessions

These require:

* WebSocket server
* Possibly separate microservice
* Strong moderation system

---

## **Stack Evolution Summary**

| Phase | Backend            | DB       | Storage  | Infra            | Complexity  |
| ----- | ------------------ | -------- | -------- | ---------------- | ----------- |
| 1     | Supabase only      | Supabase | Supabase | Vercel           | Low         |
| 1.5   | Same               | Same     | Same     | Same             | Low         |
| 2     | Supabase           | Supabase | Supabase | Vercel           | Medium      |
| 3     | FastAPI + Supabase | Supabase | Supabase | Docker + Railway | Medium–High |
| 4     | FastAPI            | RDS      | S3       | AWS + Redis      | High        |
| 5     | Microservices      | RDS      | S3       | Cloud infra      | Very High   |

---

## **Critical Guardrail**

At any moment, you should be able to answer:

> What phase am I in?

If you cannot answer that clearly, you are drifting.

---

## **Final Lock-In**

Phase 1 stack is:

* Next.js
* TypeScript
* Tailwind
* Supabase
* Vercel

Nothing more.

You only earn complexity by shipping stability.

---

## **VI. Learning Map by Technology**

| Category                   | Phase Introduced | What to Learn                    |
| -------------------------- | ---------------- | -------------------------------- |
| **Frontend (Next.js, TS)** | Phase 1          | Routing, forms, API integration  |
| **State (SWR)**            | Phase 1          | Remote caching, revalidation     |
| **Supabase**               | Phase 1          | Auth, storage, RLS, SQL policies |
| **FastAPI / Express**      | Phase 3          | REST design, validation, tests   |
| **Docker / CI/CD**         | Phase 3          | Pipelines, versioned deploys     |
| **AI APIs**                | Phase 3          | Inference, async jobs            |
| **AWS (S3, RDS, Lambda)**  | Phase 4          | Cloud services & IAM             |
| **Redis / CloudFront**     | Phase 4          | Caching and performance          |
| **Monitoring Tools**       | Phase 4          | Logs, traces, dashboards         |

---

## **VII. Reflection & Review Framework**

### **Weekly Review Template**

**1. Output:**

* Features completed:
* Bugs resolved:
* Deployed changes:

**2. Metrics:**

* Latency (p95):
* Uptime:
* Monthly cost:

**3. Learnings:**

* Technical takeaway:
* Product insight:
* Process improvement:

**4. Next Week Priorities:**
1.
2.
3.

**5. Risks / Mitigation:**

---

## **VIII. Sustained Effort System**

### **Energy Management**

* Treat each phase as a *training block* (not a marathon).
* Ship small, observable improvements weekly.
* Reward every deploy with a reflection log, not new scope.

### **Momentum Rules**

1. If blocked > 24 h, simplify the goal until progress resumes.
2. Every week ends with something deployed, however small.
3. Re-read this knowledge base whenever overwhelmed—focus returns to "Practice → Upload → Critique → Track."

---

## **IX. Long-Term Vision**

*Iron Canvas* evolves into:

* **Core Tooling Layer** for practice + critique.
* **Learning Layer** for structured progress and Drawabox-style exercises.
* **Community Layer** for collaboration, events, and games.

But only after the foundation (core loop + streak dashboard) is bulletproof.

### **Future Expansion Features**

**Phase 1 (MVP) Focus:**
- Core Critique System
- Drawabox Companion integration
- DrawCritic beginner tools

**DrawaboxCompanion (Definition):**
A tool to track, organize, and review your Drawabox exercises. Log completed lessons, analyze progress, and stay motivated as you develop your fundamental drawing skills.

**Phase 5+ (Growth) Additions:**
- Art Fight seasonal events
- Drawing games (Drawception/Interference style)
- Drawception extension (if validated)
- Community challenges

**Phase 5+ (Community) Exploration:**
- Mentorship marketplace (deprioritized for now)
- Advanced gamification
- Mobile app
- Live critique sessions

**Related Standalone Projects:**
- **Visual RAG Portfolio** - Separate tool for portfolio organization using CLIP embeddings + vector search
  - Can integrate into Iron Canvas if validated
  - POC recommended: 2-3 days testing CLIP + Qdrant with 100 images

---

## **X. Definition of Done (MVP)**

- [ ] ✅ User can sign up and log in
- [ ] ✅ Upload one artwork with a tag
- [ ] ✅ Other users can leave a structured critique (3 questions)
- [ ] ✅ Critiqued artist sees total props and critique count
```ts
// rect = imageElement.getBoundingClientRect()
const x = (event.clientX - rect.left) / rect.width
const y = (event.clientY - rect.top) / rect.height
```

Then clamp to [0, 1] so you never store invalid data.

### Avoid object-fit cropping in the annotation view (Phase 1 “safety hack”)

The `object-fit` property changes how the content of an `<img>` is resized to fit its container. With `cover` or `contain`, the visible image area may be cropped or letterboxed, which means “container coordinates” ≠ “image content coordinates.” citeturn0search2turn0search10

**Earliest safest choice**:

- On the submission detail page (where commenting happens), render the image *without cropping* (no `object-fit: cover`).
- Let the `<img>` scale naturally within layout so the element’s bounding box corresponds to the visible pixels of the image.
- Use `getBoundingClientRect()` against that `<img>` element, not a wrapper.

This one UI constraint eliminates an entire class of geometry bugs in Phase 1.

### Capture intrinsic image dimensions for future-proofing

Even if you store normalized coordinates, saving the image’s intrinsic dimensions helps you later (exports, future tools, migrations). Browsers expose this via:

- `HTMLImageElement.naturalWidth` and `naturalHeight` (intrinsic, density‑corrected size). citeturn5search0turn5search2

So: add optional columns to `submissions` like `image_natural_width`, `image_natural_height`. You can populate them when the image loads (client-side) or later during a compute phase.

## Database schema extension that keeps your “persistent spine” intact

Your persistent spine is `users / submissions / critiques / props`. You can keep that stable and add **optional layering** tables for anchors + threads without rewriting your core meaning.

Because you’re on entity["company","Supabase","backend as a service"] + Postgres, you should assume the browser can hit tables directly, therefore **RLS must be correct** on every new table. citeturn3search14turn0search1

### Minimal schema: anchored comments + replies + critique replies

This keeps invariants simple (no triggers, no RPC required).

#### Anchored comments (top-level)

- One row = one anchored discussion starter

```sql
create table if not exists public.submission_comments (
  id uuid primary key default uuid_generate_v4(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  author_id uuid not null references public.users(id) on delete cascade,

  -- normalized coordinates
  x double precision not null,
  y double precision not null,
  w double precision null,
  h double precision null,

  body text not null,
  is_resolved boolean not null default false,
  created_at timestamptz not null default now()
);

-- coordinate integrity
alter table public.submission_comments
  add constraint submission_comments_x_range check (x >= 0 and x <= 1),
  add constraint submission_comments_y_range check (y >= 0 and y <= 1),
  add constraint submission_comments_w_range check (w is null or (w >= 0 and w <= 1)),
  add constraint submission_comments_h_range check (h is null or (h >= 0 and h <= 1));
```

Check constraints are the standard Postgres mechanism to enforce domain rules at the database layer. citeturn2search3

Indexes you will want immediately:

```sql
create index if not exists submission_comments_submission_id_idx
  on public.submission_comments (submission_id);

create index if not exists submission_comments_author_id_idx
  on public.submission_comments (author_id);

create index if not exists submission_comments_created_at_idx
  on public.submission_comments (created_at desc);
```

#### Replies to anchored comments

```sql
create table if not exists public.submission_comment_replies (
  id uuid primary key default uuid_generate_v4(),
  comment_id uuid not null references public.submission_comments(id) on delete cascade,
  author_id uuid not null references public.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists submission_comment_replies_comment_id_idx
  on public.submission_comment_replies (comment_id);

create index if not exists submission_comment_replies_author_id_idx
  on public.submission_comment_replies (author_id);

create index if not exists submission_comment_replies_created_at_idx
  on public.submission_comment_replies (created_at asc);
```

#### Replies to critiques (threading without restructuring critiques)

```sql
create table if not exists public.critique_replies (
  id uuid primary key default uuid_generate_v4(),
  critique_id uuid not null references public.critiques(id) on delete cascade,
  author_id uuid not null references public.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists critique_replies_critique_id_idx
  on public.critique_replies (critique_id);

create index if not exists critique_replies_author_id_idx
  on public.critique_replies (author_id);

create index if not exists critique_replies_created_at_idx
  on public.critique_replies (created_at asc);
```

### RLS policies: keep them boring and indexed

Supabase’s security model expects you to rely on Postgres RLS as “defense in depth” when exposing tables through client SDKs. citeturn0search1turn3search25

Enable RLS on each new table:

```sql
alter table public.submission_comments enable row level security;
alter table public.submission_comment_replies enable row level security;
alter table public.critique_replies enable row level security;
```

Then policies (Phase 1 public-read posture, owner-write posture):

```sql
-- submission_comments
create policy "submission_comments_select_all"
on public.submission_comments
for select
using (true);

create policy "submission_comments_insert_self"
on public.submission_comments
for insert
with check (auth.uid() = author_id);

create policy "submission_comments_update_self"
on public.submission_comments
for update
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

create policy "submission_comments_delete_self"
on public.submission_comments
for delete
using (auth.uid() = author_id);

-- submission_comment_replies
create policy "comment_replies_select_all"
on public.submission_comment_replies
for select
using (true);

create policy "comment_replies_insert_self"
on public.submission_comment_replies
for insert
with check (auth.uid() = author_id);

create policy "comment_replies_update_self"
on public.submission_comment_replies
for update
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

create policy "comment_replies_delete_self"
on public.submission_comment_replies
for delete
using (auth.uid() = author_id);

-- critique_replies
create policy "critique_replies_select_all"
on public.critique_replies
for select
using (true);

create policy "critique_replies_insert_self"
on public.critique_replies
for insert
with check (auth.uid() = author_id);

create policy "critique_replies_update_self"
on public.critique_replies
for update
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

create policy "critique_replies_delete_self"
on public.critique_replies
for delete
using (auth.uid() = author_id);
```

**Critical performance note:** RLS policies can become a performance problem if they force scans. Supabase explicitly recommends adding indexes to columns used in RLS filters (e.g., `user_id`) and notes large improvements when you do. citeturn5search15turn3search24

In the policies above, `author_id` is the key filter column, so indexing it is not optional once data grows.

### Storage access still matters

Point‑comments only work if the image is reliably viewable. If your bucket is private, you’ll likely use signed URLs; Supabase docs describe using RLS on `storage.objects` and generating signed URLs for time-limited access. citeturn1search1turn1search5

## Data fetching and UI consistency with SWR

Your new features increase the number of “live” pieces of data on a submission page:

- submission record
- critiques + critique_replies
- submission_comments + submission_comment_replies
- props counts

This is exactly when a “remote state” tool pays for itself. citeturn0search0turn0search4

### Why SWR fits this specific situation

SWR is built around the stale‑while‑revalidate idea: return cached data first, then revalidate in the background. The library documentation explicitly frames it as caching + revalidation + request deduplication in a minimal hook API. citeturn0search0turn0search4

That concept comes from HTTP caching semantics: `stale-while-revalidate` is defined in RFC 5861 as a Cache-Control extension for serving stale content while revalidating. citeturn1search2turn1search6

### Mutation strategy

When a user posts a reply or creates a point-comment, you want the UI to update without manual “refetch spaghetti.” SWR’s docs provide `mutate` and mutation helpers for updating cached keys and revalidating. citeturn0search16

Your “Phase 1 safe” pattern:

- Use one SWR key per resource bundle (example: `submission:{id}:detail`)
- On any write, either:
  - optimistic update then `mutate(key)` to revalidate, or
  - just `mutate(key)` after the insert

### Query shape with Supabase joins

You will often want “submission with related rows.” Supabase supports joins/nesting of relations, including inner join modifiers on embedded relations. citeturn3search1

This matters because without careful query shape you’ll accidentally implement N+1 fetching (one request for submission, then many for comments/replies).

If you do nesting, remember this interaction with RLS:

- nesting will still be filtered through RLS per table
- if your policies are too complex or not indexed, nested queries will be slow at scale citeturn3search14turn5search15

## Critical risks you should explicitly defend against

### Geometry drift from CSS choices

If you allow the annotation image to be displayed with `object-fit: cover` in one view and `contain` in another, your markers will appear “wrong” even if your math is correct—because the underlying pixel mapping changed. That’s inherent in how `object-fit` and `object-position` alter content fitting inside replaced elements. citeturn0search2turn0search10

Phase 1 mitigation: **standardize the annotation view layout** (no cropping).

### Image rotation and EXIF orientation

If you ever see “my pins are offset/rotated,” a common culprit is EXIF orientation metadata (especially from phones). Different pipelines may or may not apply the orientation consistently. This is a known, recurring issue in web image handling and can show up as “looks correct in one viewer but rotated in another.” citeturn1search7turn1search31

If you don’t have a compute layer yet, the Phase 1 mitigation is pragmatic:

- accept that some uploads may be problematic
- later (Phase 3), normalize orientation server-side during upload/processing

### RLS performance regressions

Every “new table + new policy” increases the chance you accidentally create a slow query path. Supabase’s own troubleshooting guidance for RLS performance calls out indexing policy filter columns as the first lever and shows dramatic improvements reported when correct indexes are added. citeturn5search15turn3search24

So take this as a rule: **no new policy without an index review**.

### Realtime temptation

You will be tempted to add realtime because “Google Docs feels realtime.” Don’t. Supabase realtime authorization adds its own policy surface and can add latency / performance impact as RLS complexity grows. citeturn5search4turn5search22

SWR’s revalidation (focus revalidate, mutation revalidate) is enough for Phase 1.

## Knowledge base updates that keep you disciplined while still allowing this

If you do this in Phase 1, you need to change your knowledge base in a way that preserves your main guardrail (“What phase am I in?”) while acknowledging that you added a complexity slice.

A clean update is:

- Treat this as **Phase 1 extension** (not a new phase), but explicitly define:
  - what you are adding
  - what you are *not* adding

### Phase 1 extension definition

Add a subsection under Phase 1 deliverables:

- Anchored point comments on submission detail page
- Replies on:
  - critiques
  - anchored comments
- Optional: resolved/unresolved for anchored comments

Explicit non-goals (write them into the knowledge base):

- No box selection UI (even if DB supports `w/h`)
- No freehand drawing, no stroke capture
- No realtime collaboration
- No notifications / mentions
- No moderation system beyond delete‑your‑own

### Definition of done for this extension

You’ll know it’s “done” (Phase 1‑safe) when:

- A reviewer can click on an image and create a point comment that re-renders in the correct location after refresh on:
  - desktop
  - mobile
- Another user can reply, and replies keep stable order (oldest → newest).
- RLS tests pass:
  - user can’t edit/delete someone else’s comments/replies
  - unauthenticated user can’t insert
- Your “core loop” remains intact and deployable: Practice → Upload → Critique → Track still works even if the annotation feature is turned off. citeturn0search1turn3search14

### Upgrade trigger adjustment

Your existing Phase 2 is “Image Annotation System” (drawing strokes). Keep that. The new trigger becomes clearer:

- Phase 2 starts only when:
  - point comments are stable
  - you want multi-stroke graphics (canvas) rather than simple geometric anchors

That preserves discipline: you are adding *anchored discussion*, not *full annotation drawing*.

---

This approach gives you the “Docs-lite” experience you want without collapsing your Phase 1 into a canvas/graphics subsystem. It also keeps your schema evolution aligned with standards-based thinking (normalized coordinates and optional future `xywh` compatibility) while staying grounded in what your current stack (Supabase + RLS + SWR) is strongest at. citeturn2search1turn1search0turn0search0turn5search15

## Secrets & Config (Phase 1 Rule)
- Store tokens in `.env.local` (e.g., `MAILTRAP_TOKEN`)
- Never commit secrets to the repo (they can leak via git/builds)