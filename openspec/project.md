# Project Context

## Purpose
TurboMVP is an AI-focused SaaS starter kit built with Next.js 16. It provides authentication, dashboard, profile/settings, and pricing configuration so you can ship the first version of an AI SaaS product quickly without re-building common scaffolding.

- **Goals**
  - Provide a production-ready baseline for auth, accounts, sessions, and pricing.
  - Encourage simple, boring architecture that's easy to extend and maintain.
  - Serve as a reference implementation for Better Auth + Drizzle ORM + Tailwind CSS v4.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (React 19)
- **Runtime:** Node.js (Vercel / Node-compatible hosting)
- **Database:** PostgreSQL
- **ORM & Migrations:** Drizzle ORM (`drizzle-orm`) with `drizzle-kit` for migrations
- **Authentication:** Better Auth v1.4+ (email/password, Google, GitHub)
- **UI / Components:**
  - React 19
  - Radix UI primitives
  - shadcn/ui-based components in `components/ui`
  - Hugeicons and React Icons
  - Vaul for drawers/modals
- **Styling / Motion:**
  - Tailwind CSS v4 (via `@tailwindcss/postcss`)
  - Framer Motion
  - `tw-animate-css` for animation utilities
- **Data Display / Tables / Charts:**
  - Recharts
  - `@tanstack/react-table`
- **Email:**
  - React Email (`@react-email/components`) for email templates
- **Tooling:**
  - Package manager: pnpm
  - Linting: Biome (`pnpm lint` runs `biome check .`)
  - Additional static analysis: Ultracite (present in devDependencies for stricter rules if configured)
  - TypeScript 5+

## Project Conventions

### Code Style
- **TypeScript-first:**
  - Prefer TypeScript over plain JavaScript.
  - Avoid `any` where possible; use `unknown` + narrowing when needed.
- **Imports:**
  - Use absolute imports with `@/` prefix throughout the app.
  - Prefer direct imports from specific files instead of barrel exports for performance (see README).
- **Naming:**
  - Components: PascalCase (e.g., `DashboardCard`, `AppSidebar`).
  - Hooks: `useSomething` camelCase (e.g., `useProfileUpdate`).
  - Utility functions: camelCase.
  - Files: generally kebab-case or lowerCamelCase matching the main export.
- **React:**
  - Use function components.
  - Prefer hooks and composition over inheritance.
- **Validation & Parsing:**
  - Use Zod (`zod`) for runtime validation where appropriate (forms, server actions, input parsing).

### Architecture Patterns
- **Routing / Pages:**
  - Uses Next.js App Router under the `app/` directory.
  - Auth-related pages live under `app/login`, `app/signup`, `app/forgot-password`, etc.
  - Dashboard and account settings live under `app/dashboard`, `app/settings`, and related subroutes.
- **Authentication:**
  - Better Auth configuration is in `auth/auth.ts`.
  - Client-side auth utilities and hooks are in `auth/auth-client.ts`.
  - Use these helpers instead of talking to auth internals or sessions directly.
- **Database / ORM:**
  - Drizzle ORM schemas live in `db/schema/*` (e.g., `users.ts`, `account.ts`, `session.ts`).
  - Central Drizzle client lives in `lib/db.ts`.
  - All database access SHOULD go through Drizzle; avoid raw SQL unless explicitly justified.
- **Server Actions / Business Logic:**
  - Server actions live in `lib/actions/*` (e.g., `auth-actions.ts`, `profile-actions.ts`).
  - Keep actions small, focused, and limited to clear responsibilities (auth flows, profile updates, etc.).
- **Configuration:**
  - `config/site.ts` holds site metadata.
  - `config/features.ts` defines features/marketing toggles.
  - `config/pricing.ts` defines pricing plans.
  - Prefer configuration-driven behavior over hardcoding values in components where practical.
- **UI Composition:**
  - Shared, reusable primitives live in `components/ui` and `components/shared`.
  - Domain-specific UI lives under folders like `components/dashboard`, `components/landing`, `components/navigation`, `components/profile`, `components/settings`, and `components/emails`.
  - Keep route-level files focused on wiring (data loading, layout) and push reusable pieces into `components/**`.

### Testing Strategy
- Currently, there is no dedicated automated testing framework configured in `package.json`.
- Manual testing is used for core flows such as signup, login, password reset, dashboard, and settings.
- When adding automated tests:
  - Prefer a modern, TypeScript-friendly test runner (e.g., Vitest or Jest) for unit and integration tests.
  - Consider a browser-based framework (e.g., Playwright) for end-to-end tests of critical flows (auth, onboarding, billing).
  - Co-locate tests with the code (`*.test.ts` / `*.test.tsx`) or in a dedicated `tests/` directory and document the pattern here.

### Git Workflow
- **Recommended branch strategy:**
  - Use `main` as the primary trunk branch.
  - Create short-lived branches for changes:
    - `feat/<short-description>` for features.
    - `fix/<short-description>` for bug fixes.
    - `chore/<short-description>` for maintenance and refactors.
  - Prefer small, focused PRs that align with a single OpenSpec change when applicable.
- **Commit messages:**
  - Use clear, descriptive messages summarizing the change.
  - Optionally follow Conventional Commits (e.g., `feat:`, `fix:`, `chore:`) if it helps tooling.
  - Reference OpenSpec change IDs and/or spec files in PR descriptions when relevant.

## Domain Context
- TurboMVP is a **SaaS starter template** targeted at AI products:
  - Pre-built landing page sections (hero, features, FAQ, CTAs) for marketing.
  - Authenticated dashboard suitable for product metrics or AI usage analytics.
  - User profile and settings flows, including account/security management.
  - Pricing configuration for subscription-style offerings.
- Core domain concepts include:
  - **User**: application user record.
  - **Account**: OAuth accounts associated with a user (e.g., Google, GitHub).
  - **Session**: login sessions used by Better Auth.
  - **Features and pricing plans**: defined via configuration for marketing and future billing integration.
- The template is intentionally generic so it can be adapted to many AI SaaS niches (dashboards, APIs, internal tools, customer-facing assistants, etc.).

## Important Constraints
- **Simplicity first:**
  - Favor straightforward implementations and small changes when possible.
  - Avoid unnecessary abstractions and new dependencies unless they solve a clear problem.
- **Database:**
  - PostgreSQL is the primary supported database, configured via the `DATABASE_URL` environment variable.
  - All schema changes should go through Drizzle migrations (`drizzle-kit generate`, then `drizzle-kit push` or `drizzle-kit migrate`).
- **Authentication:**
  - Better Auth is the single source of truth for authentication and session management.
  - Do not introduce alternative auth libraries or flows without an explicit OpenSpec change.
- **Deployment:**
  - The app is intended to run on platforms that support Next.js 16 (e.g., Vercel-style environments).
  - Avoid relying on platform-specific features that would break portability without documenting them.
- **Environment configuration:**
  - All secrets and environment-specific values MUST be provided via `.env` files (see `.env.example`).
  - Never commit secrets or credentials to the repository.

## External Dependencies
- **Database:**
  - A PostgreSQL instance reachable via `DATABASE_URL`.
- **Authentication providers:**
  - OAuth apps for providers configured in Better Auth, such as Google and GitHub, with client IDs/secrets set via environment variables.
- **Email delivery:**
  - An email delivery provider (to be configured) responsible for sending transactional emails (e.g., password reset, verification) rendered with React Email templates.
- **Hosting / CDN:**
  - Intended for deployment on a modern Next.js host (such as Vercel) that provides Node.js runtimes, edge/CDN, and environment variable management.
- When integrating additional external services (payments, storage, third-party APIs), they SHOULD be documented here with:
  - Purpose of the service.
  - Environment variables used.
  - Any notable limits, SLAs, or regional constraints relevant to behavior.

