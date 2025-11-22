# Project Context

## Purpose
TurboMVP is a comprehensive Next.js SaaS boilerplate designed to accelerate the development of Minimum Viable Products (MVPs). It provides a production-ready foundation with essential features like authentication, database integration, dashboard layout, and a fully designed landing page, allowing developers to focus on building their unique value proposition.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript, React 19
- **Styling**: Tailwind CSS v4, `tw-animate-css` (Tailwind Animate), `class-variance-authority`, Framer Motion
- **Components**: Radix UI Primitives, Shadcn UI (inferred structure), Lucide/HugeIcons/Tabler Icons
- **Database**: PostgreSQL, Drizzle ORM (`drizzle-orm`, `drizzle-kit`)
- **Authentication**: Better Auth
- **Form/Validation**: Zod
- **Emails**: React Email
- **Linting/Formatting**: Biome, Ultracite

## Project Conventions

### Code Style
- **Linting & Formatting**: Enforced via `@biomejs/biome` with `ultracite` configuration.
- **File Naming**:
    - Components: PascalCase (e.g., `Hero.tsx`, `ActiveUsersCard.tsx`).
    - Utilities/Hooks: kebab-case (e.g., `use-mobile.ts`, `auth-helpers.ts`).
    - App Routes: Next.js standard conventions (e.g., `page.tsx`, `layout.tsx`).
- **Structure**:
    - `app/`: Application routes and pages.
    - `components/`: Feature-grouped UI components (`landing`, `dashboard`, `auth`) and shared primitives (`ui`).
    - `lib/`: Shared utilities, database connection, and server actions.
    - `db/`: Drizzle schema definitions.
    - `hooks/`: Custom React hooks.

### Architecture Patterns
- **Data Fetching**: Next.js Server Actions (located in `lib/actions`) and direct database queries in server components.
- **Database**: Single Drizzle client instance exported from `lib/db.ts`. Schema defined in `db/schema/`.
- **Authentication**: Managed via `better-auth` with helpers in `lib/auth-helpers.ts` and client components in `auth/`.
- **UI Composition**: Heavy use of `SectionAnimation` for landing page elements. Components are modular and grouped by feature domain.

### Testing Strategy
- *Currently undefined.* No test runner (Jest/Vitest) or E2E framework (Playwright/Cypress) is configured in `package.json`.

### Git Workflow
- Standard feature branching workflow is implied.
- Commits should likely follow conventional commits (though not strictly enforced by tools visible in root).

## Domain Context
- **SaaS/MVP**: The project structure supports typical SaaS requirements: Landing Page -> Auth/Onboarding -> Dashboard -> User Settings/Profile.
- **Features**:
    - **Landing Page**: includes Hero, Logo Cloud, Features, Video, Why Choose Us, Pricing/Value Prop, Testimonials, FAQ, CTA.
    - **Dashboard**: Includes layout with sidebar, charts (Recharts), and stats.

## Important Constraints
- **Database**: Requires a PostgreSQL database (using `pg` driver).
- **Next.js Version**: Locked to Next.js 16.0.3 and React 19, so dependencies must be compatible with the React 19 RC/Beta ecosystem if applicable (though `react` is `19.2.0` so it is stable now).
- **Tailwind v4**: Uses the latest Tailwind CSS v4, which may have different configuration patterns compared to v3.

## External Dependencies
- **PostgreSQL Database**: Required connection string `DATABASE_URL`.
- **Better Auth**: Authentication services.
- **Font Providers**: Geist font (via `next/font`).
