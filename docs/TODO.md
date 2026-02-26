# Iron Canvas MVP - TODO

## Project Overview
Building a full-stack platform where artists upload practice pieces, receive structured feedback, and track progress.

**Core Loop**: Practice → Upload → Critique → Track

> 📖 **See [Knowledge Base](KNOWLEDGEBASE.md)** for complete project philosophy, execution system, and learning roadmap.

## Technical Roadmap & Architecture (Locked)

Each phase has:

* 🎯 Objective
* 🧱 Tech Stack
* 📦 Deliverable
* 🔄 Upgrade Trigger

---

## Phase 1 — Core Critique Engine (MVP)

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
* Supabase (Auth, Postgres, Storage, RLS)

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

### Database Schema (Persistent)
* `users` (id, username, email, created_at)
* `submissions` (id, user_id, image_url, exercise_type, created_at)
* `critiques` (id, submission_id, reviewer_id, what_works, what_to_improve, next_focus, created_at)
* `props` (id, submission_id, giver_id, created_at)

### MVP Definition of Done
* ✅ User can sign up and log in
* ✅ Upload one artwork with a tag
* ✅ Other users can leave a structured critique (3 questions)
* ✅ Critiqued artist sees total props and critique count
* ✅ Dashboard displays total uploads, critiques given/received, current streak
* ✅ Deployed and stable at one public URL

### Performance Targets (Phase 1)
* p95 upload latency ≤ 3s for <5MB image
* Critique submission ≤ 1s write
* Dashboard loads ≤ 1s from cache
* Cost ≤ $20/month (Vercel + Supabase tier)

---

## Phase 1 - MVP Implementation (Days 1-10)

### Day 1-2: Foundation & Supabase Setup
- [ ] **Project Setup**
  - [x] Initialize Next.js 14 project with App Router + TypeScript
  - [x] Set up Tailwind CSS
  - [x] Configure ESLint, Prettier, and TypeScript strict mode
  - [x] Install SWR for data fetching
  - [x] Set up Git repository with conventional commit setup
  - [x] Create folder structure: app/, components/, lib/, types/, utils/

- [ ] **Supabase Setup**
  - [ ] Create Supabase project
  - [ ] Configure environment variables (.env.local)
  - [x] Install Supabase client libraries
  - [ ] Set up Supabase CLI for local development
  - [ ] Configure Row Level Security (RLS) policies

- [ ] **Database Schema (Supabase)**
  - [ ] Create `users` table (id, username, email, created_at)
  - [ ] Create `submissions` table (id, user_id, image_url, exercise_type, created_at)
  - [ ] Create `critiques` table (id, submission_id, reviewer_id, what_works, what_to_improve, next_focus, created_at)
  - [ ] Create `props` table (id, submission_id, giver_id, created_at)
  - [ ] Set up database indexes for performance
  - [ ] Configure RLS policies for each table

- [ ] **Authentication System (Supabase Auth)**
  - [ ] Set up Supabase Auth configuration
  - [x] Create auth context and hooks
  - [x] Implement registration form (username + email)
  - [x] Implement login/logout functionality
  - [x] Set up protected routes middleware
  - [x] Create basic user profile page
  - [ ] Test auth flow end-to-end

- [ ] **Image Upload (Supabase Storage)**
  - [ ] Create Supabase storage bucket for artwork
  - [ ] Configure storage policies and permissions
  - [x] Create image upload utility functions
  - [x] Implement image upload form (basic)
  - [ ] Add image optimization and validation
  - [ ] Test upload functionality

---

## Day 3-4: Core Upload & Dashboard
- [ ] **Submission Form**
  - [x] Create artwork upload form component
  - [x] Add exercise type selection (Boxes, Ellipses, Figures)
  - [ ] Implement image preview functionality
  - [x] Add form validation
  - [x] Connect to backend API
  - [ ] Handle upload progress feedback

- [ ] **Dashboard View**
  - [ ] Create user dashboard layout
  - [ ] Display user's uploaded submissions
  - [ ] Show submission thumbnails with metadata
  - [ ] Add submission filtering by exercise type
  - [ ] Implement basic responsive design

- [ ] **Submission Detail Page**
  - [ ] Create individual submission view
  - [ ] Display full-size image
  - [ ] Show submission metadata (date, exercise type)
  - [ ] Add navigation between submissions

---

## Day 5-6: Critique System
- [ ] **Critique Form**
  - [ ] Design structured critique form (3 fields)
    - What works well
    - What to improve
    - Next focus area
  - [ ] Create critique submission API endpoint
  - [ ] Add form validation and error handling
  - [ ] Link critiques to submissions and reviewers

- [ ] **Critique Display**
  - [ ] Show critiques on submission detail pages
  - [ ] Display critique author and timestamp
  - [ ] Add critique formatting and styling
  - [ ] Implement critique pagination (if needed)

- [ ] **Critique Management**
  - [ ] Create "My Critiques" page for users
  - [ ] Show critiques given and received
  - [ ] Add critique editing/deletion (basic)

---

## Day 7: Props & Basic Metrics
- [ ] **Props System**
  - [ ] Create "+1 Prop" button component
  - [ ] Implement props API endpoints
  - [ ] Add props counter to submissions
  - [ ] Prevent self-propping
  - [ ] Show props given/received in user dashboard

- [ ] **Basic Metrics Queries**
  - [ ] Create database queries for user statistics
  - [ ] Count total uploads per user
  - [ ] Count critiques given and received
  - [ ] Calculate current streak logic
  - [ ] Optimize queries for dashboard performance

---

## Day 8: Growth Dashboard
- [ ] **Dashboard Metrics Display**
  - [ ] Create statistics cards component
  - [ ] Display total uploads, critiques given/received
  - [ ] Show current streak counter
  - [ ] Add streak definition (upload or critique within 3 days)

- [ ] **Progress Visualization**
  - [ ] Implement simple bar chart (uploads vs critiques)
  - [ ] Add chart library (Chart.js or similar lightweight option)
  - [ ] Create responsive chart component
  - [ ] Show progress over time (weekly/monthly view)

- [ ] **Dashboard Polish**
  - [ ] Improve dashboard layout and spacing
  - [ ] Add loading states for metrics
  - [ ] Handle empty states gracefully

---

## Day 9: Styling & Responsive Design
- [ ] **UI/UX Polish**
  - [ ] Consistent color scheme and typography
  - [ ] Improve button and form styling
  - [ ] Add hover states and transitions
  - [ ] Ensure accessibility (ARIA labels, keyboard navigation)

- [ ] **Responsive Layout**
  - [ ] Mobile-first responsive design
  - [ ] Test on mobile, tablet, and desktop
  - [ ] Optimize image display for different screen sizes
  - [ ] Fix any layout breaking issues

- [ ] **Performance Optimization**
  - [ ] Optimize image loading (lazy loading, compression)
  - [ ] Add loading spinners and skeleton screens
  - [ ] Minimize bundle size
  - [ ] Test and optimize database queries

---

## Day 10: Deployment & Documentation
- [ ] **Deployment**
  - [ ] Deploy frontend to Vercel
  - [ ] Set up production environment variables
  - [ ] Configure domain and SSL
  - [ ] Test production deployment thoroughly

- [ ] **Performance Testing**
  - [ ] Test p95 upload latency (target: ≤3s for <5MB)
  - [ ] Test critique submission speed (target: ≤1s)
  - [ ] Test dashboard load time (target: ≤1s from cache)
  - [ ] Monitor costs (target: ≤$20/month)

- [ ] **Documentation & Demo**
  - [ ] Update README with actual schema
  - [ ] Document API endpoints
  - [ ] Create demo video
  - [ ] Add deployment instructions
  - [ ] Document KPIs and metrics

- [ ] **Final Testing**
  - [ ] Complete end-to-end testing
  - [ ] User acceptance testing
  - [ ] Fix any critical bugs
  - [ ] Prepare for launch

---

## Definition of Done Checklist
- [ ] ✅ User can sign up and log in
- [ ] ✅ Upload one artwork with a tag
- [ ] ✅ Other users can leave a structured critique (3 questions)
- [ ] ✅ Critiqued artist sees total props and critique count
- [ ] ✅ Dashboard displays total uploads, critiques, and current streak
- [ ] ✅ Deployed and stable at one public URL

---

## Future Phases (Reference)

Phase 1.5: Curriculum metadata layer (optional fields + simple filters).

Phase 2: Image annotation system (canvas or Konva + annotations table).

Phase 3: Compute layer (FastAPI/Express + Docker + CI/CD).

Phase 4: Performance & cloud hardening (AWS, Redis, observability).

Phase 5: Advanced modules (events, games, realtime sessions).

> 📊 **Full metrics, review templates, and execution system in [Knowledge Base](KNOWLEDGEBASE.md)**
