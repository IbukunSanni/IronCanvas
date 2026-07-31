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
* Queue of posts needing critique
* Critique credit system
* Props work
* Dashboard metrics work (posts, critiques given/received)
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
* ✅ Queue of posts needing critique
* ✅ Critique credit system
* ✅ Dashboard displays total posts, critiques given/received, credits
* ✅ Deployed and stable at one public URL

### Performance Targets (Phase 1)
* Keep it functional and stable

---

## Phase 1 - MVP Implementation (Days 1-10)

### Day 1-2: Foundation & Supabase Setup
- [x] **Project Setup**
  - [x] Initialize Next.js 14 project with App Router + TypeScript
  - [x] Set up Tailwind CSS
  - [x] Configure ESLint, Prettier, and TypeScript strict mode
  - [x] Install SWR for data fetching
  - [x] Set up Git repository with conventional commit setup
  - [x] Create folder structure: app/, components/, lib/, types/, utils/

- [x] **Supabase Setup**
  - [x] Create Supabase project
  - [x] Configure environment variables (.env.local)
  - [x] Install Supabase client libraries
  - [x] Set up Supabase CLI for local development
  - [x] Configure Row Level Security (RLS) policies

- [x] **Database Schema (Supabase)**
  - [x] Create `users` table (id, username, email, created_at)
  - [x] Add optional `avatar_url` to users
  - [x] Create `submissions` table (id, user_id, image_url, exercise_type, created_at)
  - [x] Create `critiques` table (id, submission_id, reviewer_id, what_works, what_to_improve, next_focus, created_at)
  - [x] Create `props` table (id, submission_id, giver_id, created_at)
  - [x] Set up database indexes for performance
  - [x] Configure RLS policies for each table

- [x] **Authentication System (Supabase Auth)**
  - [x] Set up Supabase Auth configuration
  - [x] Create auth context and hooks
  - [x] Implement registration form (username + email)
  - [x] Implement login/logout functionality
  - [x] Add magic link sign-in
  - [x] Add set-password page
  - [x] Set up protected routes middleware
  - [x] Create basic user profile page
  - [x] Allow profile photo (URL-based)
  - [ ] Test auth flow end-to-end

- [ ] **Image Upload (Supabase Storage)**
  - [x] Create Supabase storage bucket for artwork
  - [x] Configure storage policies and permissions
  - [x] Create image upload utility functions
  - [x] Implement image upload form (basic)
  - [x] Add file validation (size/type)
  - [ ] Add image optimization and validation
  - [ ] Test upload functionality

---

## Day 3-4: Core Upload & Dashboard
- [ ] **Submission Form**
  - [x] Create artwork upload form component
  - [x] Add exercise type selection (Boxes, Ellipses, Figures)
  - [x] Implement image preview functionality
  - [x] Add form validation
  - [x] Connect to backend API
  - [x] Handle upload progress feedback

- [ ] **Dashboard View**
  - [x] Create user dashboard layout
  - [x] Display user's uploaded submissions
  - [x] Show submission thumbnails with metadata
  - [x] Add submission filtering by exercise type
  - [x] Implement basic responsive design

- [ ] **Submission Detail Page**
  - [x] Create individual submission view
  - [x] Display full-size image
  - [x] Show submission metadata (date, exercise type)
  - [x] Add navigation between submissions

---

## Day 5-6: Critique System
- [ ] **Critique Form**
  - [x] Design structured critique form (3 fields)
    - What works well
    - What to improve
    - Next focus area
  - [x] Create critique submission API endpoint
  - [x] Add form validation and error handling
  - [x] Link critiques to submissions and reviewers

- [ ] **Critique Display**
  - [x] Show critiques on submission detail pages
  - [x] Display critique author and timestamp
  - [x] Add critique formatting and styling
  - [ ] Implement critique pagination (if needed)

- [ ] **Critique Management**
  - [x] Create "My Critiques" page for users
  - [x] Show critiques given and received
  - [x] Add critique editing/deletion (basic)

---

## Day 7: Props & Basic Metrics
- [ ] **Props System**
  - [x] Create "+1 Prop" button component
  - [x] Implement props API endpoints
  - [x] Add props counter to submissions
  - [x] Prevent self-propping
  - [x] Show props given/received in user dashboard

- [ ] **Basic Metrics Queries**
  - [x] Create database queries for user statistics
  - [x] Count total posts per user
  - [x] Count critiques given and received
  - [x] Calculate critique credits

---

## Day 8: Growth Dashboard
- [ ] **Dashboard Metrics Display**
  - [x] Create statistics cards component
  - [x] Display total posts, critiques given/received
  - [x] Display critique credits

- [ ] **Progress Visualization**
  - [ ] Optional: simple bar chart (posts vs critiques)

- [ ] **Dashboard Polish**
  - [x] Improve dashboard layout and spacing
  - [x] Add loading states for metrics
  - [x] Handle empty states gracefully

---

## Day 9: Styling & Responsive Design
- [x] **UI/UX Polish**
  - [x] Consistent color scheme and typography
  - [x] Improve button and form styling
  - [x] Add hover states and transitions
  - [x] Ensure accessibility (ARIA labels, keyboard navigation)

- [x] **Responsive Layout**
  - [x] Mobile-first responsive design
  - [x] Test on mobile, tablet, and desktop
  - [x] Optimize image display for different screen sizes
  - [x] Fix any layout breaking issues

- [ ] **Performance Optimization**
  - [ ] Optional: optimize image loading if needed

---

## Day 10: Deployment & Documentation
- [ ] **Deployment**
  - [ ] Deploy frontend to Vercel
  - [ ] Set up production environment variables
  - [ ] Configure domain and SSL
  - [ ] Test production deployment thoroughly

- [ ] **Email (Mailtrap)**
  - [x] Set SMTP_* variables in .env.local
  - [x] Update email templates via Management API (Iron Canvas branding)
  - [ ] Enable custom SMTP in Supabase Dashboard (point to Mailtrap)
  - [ ] Test confirmation email (register → Mailtrap inbox)
  - [ ] Test magic link email (login → Mailtrap inbox)
  - [ ] Test password reset email
  - [ ] Verify email links redirect correctly to app
  - [ ] (Production) Switch SMTP from Mailtrap sandbox to Resend or Mailtrap sending domain

- [ ] **Performance Testing**
  - [ ] Priority: basic smoke test (auth → upload → critique → credits)

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

### MVP Testing Checklist
- [ ] Auth: sign up, login, logout, protected routes redirect
- [ ] Auth: magic link sign-in works
- [ ] Auth: set-password works after magic link
- [ ] Upload: valid image uploads and renders
- [ ] Upload: invalid file rejected (type/size)
- [ ] Dashboard: uploads/critique counts update
- [ ] Dashboard: filters work and empty states render
- [ ] Submission: detail view loads and shows metadata
- [ ] Critiques: create and view critiques
- [ ] Storage: uploaded image persists after refresh

---

## Testing Checklist (MVP)
- [ ] Auth: sign up, login, logout, protected routes redirect
- [ ] Upload: valid image uploads, invalid file blocked, metadata saved
- [ ] Dashboard: uploads/critique counts match DB, filters work
- [ ] Critiques: create/read/delete own critique, cannot edit others
- [ ] RLS: cannot insert/update/delete as another user (submissions/critiques/props)
- [ ] Storage: uploaded image is viewable and persists after refresh
- [ ] Empty states: no submissions, filtered empty, error state

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
