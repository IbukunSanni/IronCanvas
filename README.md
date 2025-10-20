# Iron Canvas MVP

> A web app where artists upload drawings from practice sessions, receive structured critiques, and track progress with simple metrics.

## Core Product Statement

**Practice → Upload → Critique → Track.**
That's it. Everything else (social feed, gamification, AI suggestions) waits.

## MVP Loop

The minimum viable loop that proves the concept, demonstrates full-stack skill, and ships fast.

## 1. Core MVP Features

| Layer                     | Feature                                      | Purpose                          | MVP Cut                                                |
| ------------------------- | -------------------------------------------- | -------------------------------- | ------------------------------------------------------ |
| **Auth**                  | Sign up / login                              | Identify user                    | Username + email only                                  |
| **Practice Upload**       | Upload image + select exercise type          | Capture "practice" data          | 1–3 exercise tags (e.g., Boxes, Ellipses, Figures)     |
| **Critique Form**         | Structured critique on uploaded work         | Enable feedback                  | 3 text fields: what works, what to improve, next focus |
| **Progress Tracker**      | Show total uploads, critiques received/given | Reinforce growth                 | One dashboard tile with counts + streak                |
| **Props (encouragement)** | Small reward signal                          | Social motivation                | +1 "Prop" button, no complex currency                  |
| **Growth Dashboard**      | Visualize improvement                        | Combine practice + critique data | Simple bar chart (uploads vs critiques)                |

## 2. Technical Stack & Growth Roadmap

### Phase 1 – MVP (Ship Now)

| Layer                             | Tool                                                 | Purpose                                    | Reason                                           |
| --------------------------------- | ---------------------------------------------------- | ------------------------------------------ | ------------------------------------------------ |
| **Frontend**                      | **Next.js (App Router) + TypeScript + Tailwind CSS** | UI, routing, forms, uploads, dashboard     | Fast build, strong typing, easy deploy to Vercel |
| **State Mgmt**                    | Zustand / SWR                                        | Local & remote caching                     | Lightweight, no Redux complexity                 |
| **Backend / DB / Auth / Storage** | **Supabase**                                         | Postgres + Auth + Storage + Edge Functions | Single platform → no servers to run              |
| **Deployment**                    | Vercel (frontend) + Supabase (back + data)           | CI/CD & hosting                            | Lowest friction                                  |
| **Analytics**                     | Supabase SQL views                                   | Progress, counts                           | Simple aggregates                                |
| **Business Logic**                | RLS + Edge Functions                                 | Validation & metrics                       | Secure, minimal code                             |

✅ **Focus**: ship the **Practice → Upload → Critique → Track** loop  
🕐 **Duration**: ~10 days  
🧠 **Skills gained**: product flow, DB schema, auth, cloud storage, deployment

#### Database Schema
- `users` (id, username, email, created_at)
- `submissions` (id, user_id, image_url, exercise_type, created_at)
- `critiques` (id, submission_id, reviewer_id, what_works, what_to_improve, next_focus, created_at)
- `props` (id, submission_id, giver_id, created_at)

### Phase 2 – Expansion (Learn Foundations)

Add **real backend compute** and **structured APIs** while keeping Supabase as data/auth layer.

| Layer          | Upgrade                                                                | Skill Learned                            |
| -------------- | ---------------------------------------------------------------------- | ---------------------------------------- |
| **API**        | Add **FastAPI (or Express + TypeScript)** service in front of Supabase | Routing, validation, middleware, testing |
| **Queries**    | Try **GraphQL (pg_graphql or Apollo)** for nested reads                | Schema design, resolvers, caching        |
| **Jobs**       | Add **Supabase Edge Functions or AWS Lambda** for streak + AI prep     | Async tasks, permissions                 |
| **Infra**      | Dockerize backend + CI/CD pipeline                                     | DevOps, container basics                 |
| **Monitoring** | Add **PostHog or Grafana**                                             | Metrics & logging discipline             |

**Goal**: move from *no-code backend* → *explicit service logic* while keeping product alive.

### Phase 3 – Integration & Scale (Industry Skill)

When you want to show real-world architecture strength:

| Domain                | Tool / Concept                       | Focus                    |
| --------------------- | ------------------------------------ | ------------------------ |
| **Cloud integration** | AWS S3 + RDS + Lambda + SQS          | IAM, queues, reliability |
| **Performance**       | Caching layer (Redis / CloudFront)   | Scaling read loads       |
| **Testing**           | Pytest / Vitest / Cypress            | Unit + E2E discipline    |
| **AI Extension**      | Hugging Face or OpenAI API           | Auto-critique generation |
| **Realtime**          | Supabase Realtime / WebSocket Server | Live feedback            |
| **Observability**     | CloudWatch / Grafana                 | Ops readiness            |

By this point, *Iron Canvas* becomes a production-grade system and a resume-ready case study.

## 3. Definition of Done (DoD)

- ✅ User can sign up and log in
- ✅ Upload one artwork with a tag
- ✅ Other users can leave a structured critique (3 questions)
- ✅ Critiqued artist sees total props and critique count
- ✅ Dashboard displays:
  - total uploads
  - total critiques given and received
  - current streak (upload or critique within last 3 days)
- ✅ Deployed and stable at one public URL

No feed, no ranking, no AI, no notifications yet.

## 4. Stretch (only after DoD)

- Streak visualization and badges
- Critique reliability rating
- Lesson checklist (from Drawabox Companion)
- AI critique tagging
- Team challenges or mentor tiers

## 5. Timeline (10 days)

| Day     | Task                                                        |
| ------- | ----------------------------------------------------------- |
| **1–2** | Scaffold repo, auth, DB tables, image upload route         |
| **3–4** | Submission form + dashboard view                            |
| **5–6** | Critique form + read/write endpoints                        |
| **7**   | Props system + basic metrics queries                       |
| **8**   | Growth dashboard (counts, streak)                           |
| **9**   | Style pass, responsive layout, deploy                       |
| **10**  | README with schema, KPIs (upload latency, p95), demo video |

## 6. Stack Progression Summary

| Phase             | Core Stack                      | Adds                         | Outcome                    |
| ----------------- | ------------------------------- | ---------------------------- | -------------------------- |
| **1 (MVP)**       | Next.js + Supabase              | —                            | Ship fast, learn full flow |
| **2 (Expansion)** | + FastAPI / GraphQL / Docker    | Backend & infra depth        | Structured service logic   |
| **3 (Scale)**     | + AWS / Redis / Monitoring / AI | Industry-grade system design | Production-ready platform  |

## 7. KPIs & Performance Targets

### Phase 1 (MVP)
- p95 upload latency ≤ 3s for <5MB image
- Critique submission ≤ 1s write
- Dashboard loads ≤ 1s from cache
- Cost ≤ $20/month (Vercel + Supabase tier)

### Phase 2 (Expansion)
- API response time ≤ 500ms p95
- Cost ≤ $50/month with additional services
- 99.9% uptime

### Phase 3 (Scale)
- Support 1000+ concurrent users
- Cost optimization with caching
- Full observability stack

## 8. Portfolio Framing

> "Built *Iron Canvas*, a full-stack platform where artists upload practice pieces, receive structured feedback, and track progress over time. Next.js + Supabase + TypeScript. Evolved from MVP (Supabase) → Backend Services (FastAPI) → Production Scale (AWS). 60 FPS UI, clear contracts, cached queries, and live metrics dashboard."

### Development Philosophy

**Build → Replace → Scale.**
- Never learn tech abstractly—swap it into this running system
- Keep schema stable—let everything else evolve around Postgres tables
- Track metrics at every phase: latency, cost, reliability

## Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd iron-canvas

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

## Current Tech Stack (Phase 1 - MVP)

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **State Management**: Zustand + SWR
- **Backend**: Supabase (Postgres + Auth + Storage + Edge Functions)
- **Deployment**: Vercel (frontend) + Supabase (backend/data)
- **Analytics**: Supabase SQL views
- **Business Logic**: Row Level Security (RLS) + Edge Functions

### Future Stack Evolution
- **Phase 2**: + FastAPI/GraphQL, Docker, PostHog
- **Phase 3**: + AWS services, Redis, Monitoring, AI integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.