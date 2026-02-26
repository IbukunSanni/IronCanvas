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
| **Replace (Phase 2)** | Introduce explicit backend & infra | Modular API, CI/CD, observability | Backend, DevOps, cloud fluency  |
| **Scale (Phase 3)**   | Move to industry-grade stack       | Production-grade architecture     | Systems thinking, ops readiness |

### 2. **Learning by Integration**

Never study a tool in isolation.
Each new technology must:

* Replace an existing working piece
* Improve real performance, maintainability, or insight
* Be benchmarked against clear metrics (latency, cost, stability)

### 3. **Execution Rules**

* One working system at all times (MVP must not break)
* Code in **small, testable increments**
* Focus on outcomes, not polish
* Document all major decisions and trade-offs
* Measure → reflect → iterate

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

* GitHub Projects → tasks
* TODO.md → notes & progress logs
* Supabase Dashboard → metrics
* Vercel / Render logs → performance tracking

---

## **V. Official Phased Stack**

Each phase has:

* 🎯 Objective
* 🧱 Tech Stack
* 📦 Deliverable
* 🔄 Upgrade Trigger

---

## **Phase 1 — Core Critique Engine (MVP)**

### 🎯 Objective

Ship the working loop:

Practice → Upload → Critique → Track

### 🧱 Tech Stack

**Frontend**

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* SWR (data fetching)

**Backend / Data**

* Supabase
  * Auth
  * Postgres
  * Storage
  * RLS policies

**Hosting**

* Vercel (frontend)
* Supabase (backend + DB + storage)

**No:**

* No FastAPI
* No GraphQL
* No Docker
* No AWS
* No Redis

Keep it flat.

### 📦 Deliverable

* Live deployed app
* Auth works
* Upload works
* Text critique works
* Props work
* Dashboard metrics work
* 1 real user test

### 🔄 Upgrade Trigger

Move to Phase 2 only when:

* MVP deployed
* No critical bugs
* At least 2–3 people used it

---

## **Phase 1.5 — Curriculum Metadata Layer**

### 🎯 Objective

Support Drawabox-style tracking without changing product core.

### 🧱 Tech Stack

Same as Phase 1.

Add only:

* Optional schema fields:
  * curriculum_source
  * lesson_number

UI additions:

* Filter submissions by lesson
* Lesson progress counter

**No:**

* No checklist engine
* No validation logic
* No rubric system

### 📦 Deliverable

* Dashboard filter by lesson
* Simple lesson frequency display

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
| **State (Zustand/SWR)**    | Phase 1          | Local store, revalidation        |
| **Supabase**               | Phase 1          | Auth, storage, RLS, SQL policies |
| **FastAPI / Express**      | Phase 2          | REST design, validation, tests   |
| **GraphQL**                | Phase 2          | Schema, resolvers, caching       |
| **Docker / CI/CD**         | Phase 2          | Pipelines, versioned deploys     |
| **AWS (S3, RDS, Lambda)**  | Phase 3          | Cloud services & IAM             |
| **Redis / CloudFront**     | Phase 3          | Caching and performance          |
| **AI APIs**                | Phase 3          | Inference, async jobs            |
| **Monitoring Tools**       | Phase 3          | Logs, traces, dashboards         |

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

**Phase 2 (Growth) Additions:**
- Art Fight seasonal events
- Drawing games (Drawception/Interference style)
- Community challenges

**Phase 3+ (Community) Exploration:**
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
- [ ] ✅ Dashboard displays total uploads, critiques given/received, current streak
- [ ] ✅ Deployed and stable at one public URL

---

## **XI. Technical Stack Summary**

### **Phase 1 (Current)**
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, SWR
- **Backend/Data:** Supabase (Auth, Postgres, Storage, RLS)
- **Deployment:** Vercel + Supabase
- **Cost Target:** ≤ $20/month

### **Phase 1.5 (Optional Layer)**
- **Backend/Data:** Same as Phase 1
- **Scope:** Optional curriculum metadata fields + simple UI filters

### **Phase 2 (Annotation)**
- **Frontend Additions:** HTML5 Canvas or Konva.js
- **Backend/Data:** Supabase (new annotations table)
- **Deployment:** Unchanged

### **Phase 3 (Compute Layer)**
- **Backend:** FastAPI (Python) or Express (TypeScript)
- **Infra:** Docker + Railway/Render
- **Data:** Supabase (DB + Auth) with Service Role key

### **Phase 4 (Performance & Cloud)**
- **Infra:** AWS S3, Redis, CloudFront, Lambda/background jobs
- **Observability:** PostHog or Grafana
- **CI/CD:** GitHub Actions
- **Optional DB:** AWS RDS (Postgres)

### **Phase 5 (Advanced Modules)**
- **Infra:** WebSocket server + possible microservices
- **Focus:** Realtime critique sessions, events, games, marketplace

---

## **XII. Key Principles**

1. **One working system at all times** - MVP must never break
2. **Small, testable increments** - Ship vertical slices
3. **Outcomes over polish** - Function before beauty
4. **Document decisions** - Track trade-offs and learnings
5. **Measure everything** - Performance, cost, reliability
6. **Learn by integration** - Never study tech abstractly
7. **Schema stability** - Database design persists across phases

---

## **XIII. Risk Mitigation**

- Keep Phase 1 working while building Phase 2
- Feature flags for gradual rollouts
- Database migrations with rollback plans
- Comprehensive testing at each phase transition
- Performance monitoring to catch regressions early
- If blocked > 24h, simplify until progress resumes

---

### **Closing Directive**

> "Ambition is sustainable only when tied to delivery."

Finish one slice, learn from it, then expand.
This knowledge base is your compass—update it, iterate it, live by it.

**When overwhelmed, return to the core:**
**Practice → Upload → Critique → Track**
