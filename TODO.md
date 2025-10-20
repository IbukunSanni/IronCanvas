# Iron Canvas MVP - TODO

## Project Overview
Building a full-stack platform where artists upload practice pieces, receive structured feedback, and track progress.

**Core Loop**: Practice → Upload → Critique → Track

---

## Phase 1 - MVP Implementation (Days 1-10)

### Day 1-2: Foundation & Supabase Setup
- [ ] **Project Setup**
  - [ ] Initialize Next.js 14 project with App Router + TypeScript
  - [ ] Set up Tailwind CSS
  - [ ] Configure ESLint, Prettier, and TypeScript strict mode
  - [ ] Install Zustand and SWR for state management
  - [ ] Set up Git repository with conventional commit setup
  - [ ] Create folder structure: app/, components/, lib/, types/, utils/

- [ ] **Supabase Setup**
  - [ ] Create Supabase project
  - [ ] Configure environment variables (.env.local)
  - [ ] Install Supabase client libraries
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
  - [ ] Create auth context and hooks
  - [ ] Implement registration form (username + email)
  - [ ] Implement login/logout functionality
  - [ ] Set up protected routes middleware
  - [ ] Create basic user profile page
  - [ ] Test auth flow end-to-end

- [ ] **Image Upload (Supabase Storage)**
  - [ ] Create Supabase storage bucket for artwork
  - [ ] Configure storage policies and permissions
  - [ ] Create image upload utility functions
  - [ ] Implement image upload with progress tracking
  - [ ] Add image optimization and validation
  - [ ] Test upload functionality

---

## Day 3-4: Core Upload & Dashboard
- [ ] **Submission Form**
  - [ ] Create artwork upload form component
  - [ ] Add exercise type selection (Boxes, Ellipses, Figures)
  - [ ] Implement image preview functionality
  - [ ] Add form validation
  - [ ] Connect to backend API
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
  - [ ] Deploy backend to Render/Railway (if using FastAPI)
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

## Phase 2 - Expansion (Learn Foundations)

**Goal**: Add real backend compute and structured APIs while keeping Supabase as data/auth layer

### Backend Service Layer
- [ ] **FastAPI Service Setup**
  - [ ] Create FastAPI application structure
  - [ ] Set up Docker containerization
  - [ ] Configure FastAPI + Supabase integration
  - [ ] Create API routing and middleware
  - [ ] Add request validation with Pydantic
  - [ ] Implement proper error handling
  - [ ] Set up API documentation (OpenAPI)

- [ ] **GraphQL Integration**
  - [ ] Set up pg_graphql or Apollo GraphQL
  - [ ] Design GraphQL schema
  - [ ] Create resolvers for nested queries
  - [ ] Implement query optimization and caching
  - [ ] Add GraphQL playground for development

- [ ] **Async Jobs & Functions**
  - [ ] Set up Supabase Edge Functions
  - [ ] Create streak calculation jobs
  - [ ] Implement notification system
  - [ ] Add image processing functions
  - [ ] Set up cron jobs for periodic tasks

- [ ] **Monitoring & Analytics**
  - [ ] Integrate PostHog for product analytics
  - [ ] Set up application logging
  - [ ] Add performance monitoring
  - [ ] Create custom dashboards
  - [ ] Implement error tracking

### Infrastructure & DevOps
- [ ] **CI/CD Pipeline**
  - [ ] Set up GitHub Actions
  - [ ] Create automated testing pipeline
  - [ ] Add code quality checks
  - [ ] Implement automated deployment
  - [ ] Set up staging environment

- [ ] **Testing Framework**
  - [ ] Add unit tests (Vitest)
  - [ ] Create integration tests
  - [ ] Set up E2E testing (Cypress)
  - [ ] Add API testing suite
  - [ ] Implement test coverage reporting

---

## Phase 3 - Integration & Scale (Industry Skill)

**Goal**: Production-grade system with industry-standard architecture

### Cloud Integration
- [ ] **AWS Services Migration**
  - [ ] Migrate to AWS RDS (PostgreSQL)
  - [ ] Set up S3 with CloudFront CDN
  - [ ] Implement AWS Lambda functions
  - [ ] Add SQS for async processing
  - [ ] Configure IAM roles and policies
  - [ ] Set up VPC and security groups

- [ ] **Caching & Performance**
  - [ ] Implement Redis caching layer
  - [ ] Add CloudFront for static assets
  - [ ] Optimize database queries
  - [ ] Implement connection pooling
  - [ ] Add query result caching
  - [ ] Set up CDN for image delivery

### AI & Advanced Features
- [ ] **AI Integration**
  - [ ] Integrate OpenAI or Hugging Face API
  - [ ] Implement auto-critique generation
  - [ ] Add image analysis capabilities
  - [ ] Create AI-powered exercise suggestions
  - [ ] Implement smart tagging system

- [ ] **Real-time Features**
  - [ ] Add WebSocket server
  - [ ] Implement live collaboration
  - [ ] Create real-time notifications
  - [ ] Add live critique sessions
  - [ ] Build real-time dashboard updates

### Production Operations
- [ ] **Observability**
  - [ ] Set up CloudWatch monitoring
  - [ ] Implement distributed tracing
  - [ ] Add custom metrics collection
  - [ ] Create alerting system
  - [ ] Set up log aggregation

- [ ] **Security & Compliance**
  - [ ] Implement security headers
  - [ ] Add rate limiting
  - [ ] Set up WAF (Web Application Firewall)
  - [ ] Add data encryption at rest
  - [ ] Implement audit logging
  - [ ] Conduct security audit

---

## Future Enhancements (Beyond Phase 3)
- [ ] Mobile app (React Native)
- [ ] Advanced gamification system
- [ ] Mentor/student matching
- [ ] Live streaming critique sessions
- [ ] Community challenges and competitions
- [ ] Integration with art learning platforms
- [ ] Marketplace for critique services
- [ ] Advanced analytics and insights

---

## Technical Debt & Improvements
- [ ] Add comprehensive error handling
- [ ] Implement proper logging system
- [ ] Add unit and integration tests
- [ ] Set up CI/CD pipeline
- [ ] Add monitoring and analytics
- [ ] Implement rate limiting
- [ ] Add data backup strategy
- [ ] Security audit and improvements

---

## Development Philosophy & Notes

### Build → Replace → Scale Approach
- **Phase 1**: Ship fast with Supabase - learn the full product flow
- **Phase 2**: Replace components with custom services - learn backend architecture
- **Phase 3**: Scale with industry tools - learn production operations
- Never learn tech abstractly—always integrate into this running system
- Keep database schema stable across all phases

### Key Principles
- Focus on core functionality over polish initially
- Test each feature thoroughly before moving to next phase
- Document technical decisions and architectural trade-offs
- Regular commits using conventional commit format
- Track metrics at every phase: performance, cost, reliability
- Maintain backwards compatibility when possible

### Success Metrics by Phase
- **Phase 1**: Ship working MVP in 10 days, < $20/month cost
- **Phase 2**: Add services while maintaining stability, < $50/month cost
- **Phase 3**: Scale to 1000+ users with full observability

### Risk Mitigation
- Keep Phase 1 working while building Phase 2
- Feature flags for gradual rollouts
- Database migrations with rollback plans
- Comprehensive testing at each phase transition
- Performance monitoring to catch regressions early
