# TurboMVP - AI SaaS Starter Template

A production-ready SaaS starter template built with Next.js 16, Better Auth, Drizzle ORM, and modern UI components. Perfect for quickly launching your AI SaaS product.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Random secret for auth (generate with `openssl rand -base64 32`)
- `BETTER_AUTH_URL` - Your app URL (http://localhost:3000 for development)
- OAuth credentials (if using social login)

### 3. Initialize Database

Generate and run your initial database migration:

```bash
# Generate migration from schema
pnpm drizzle-kit generate

# Apply migration to database
pnpm drizzle-kit push
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Project Structure

```
├── app/                  # Next.js 16 App Router pages and layouts
│   ├── api/auth/        # Better Auth API routes
│   ├── dashboard/       # Dashboard pages
│   ├── login/           # Login page
│   ├── signup/          # Signup page
│   ├── settings/        # Settings pages
│   └── ...
├── components/           # React components
│   ├── ui/              # Shadcn UI components
│   ├── dashboard/       # Dashboard components
│   ├── landing/         # Landing page sections
│   ├── navigation/      # Navigation components
│   ├── profile/         # Profile components
│   ├── settings/        # Settings components
│   ├── emails/          # Email templates (react-email)
│   ├── shared/          # Shared components
│   └── theme/           # Theme components
├── types/               # TypeScript type definitions
│   ├── components.ts    # Component prop types
│   ├── features.ts      # Domain/feature types
│   └── index.ts         # Type exports
├── config/              # Configuration files
│   ├── pricing.ts       # Pricing plans configuration
│   ├── features.ts      # Features configuration
│   └── site.ts          # Site metadata
├── lib/                 # Utilities and helpers
│   ├── actions/         # Server actions (auth, profile)
│   ├── auth/           # Auth helper functions
│   ├── email/          # Email theming
│   ├── utils/          # Utility functions (cn)
│   └── db.ts           # Drizzle database client
├── db/schema/           # Drizzle ORM schemas
│   ├── users.ts        # User table schema
│   ├── account.ts      # OAuth accounts schema
│   ├── session.ts      # Sessions schema
│   └── index.ts        # Schema exports
├── auth/                # Better Auth configuration
│   ├── auth.ts         # Server-side auth config
│   └── auth-client.ts  # Client-side auth hooks
└── hooks/               # Custom React hooks
```

### Import Conventions

This project uses **absolute imports** with the `@/` prefix and **direct imports** (no barrel files for performance):

```typescript
// Types
import type { Feature, PricingPlan } from "@/types";

// Configuration (direct imports)
import { pricingPlans } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { defaultFeatures } from "@/config/features";

// Components
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/landing/Hero";

// Utilities (direct imports)
import { cn } from "@/lib/utils/cn";

// Auth helpers
import { currentUser } from "@/lib/auth/helpers";
import { authClient } from "@/auth/auth-client";

// Database
import { db } from "@/lib/db";
import { users, account, session } from "@/db/schema";
```

### Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Drizzle ORM
- **Authentication:** Better Auth v1.4+ (Email/Password, Google, GitHub)
- **UI:** React 19, Radix UI, Shadcn, Tailwind CSS v4
- **Styling:** Tailwind CSS v4, Framer Motion
- **Email:** React Email
- **Package Manager:** pnpm
- **Linting:** Biome

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
