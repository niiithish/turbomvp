# TurboMVP - Production-Ready SaaS Starter Kit

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black.svg)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A comprehensive, production-ready SaaS starter template engineered with **Next.js 16**, **Better Auth**, **Drizzle ORM**, and modern React 19 architecture. Designed for developers who demand scalability, security, and developer experience when launching SaaS applications.

---

## 🎯 Project Overview

TurboMVP is a full-stack SaaS application that demonstrates advanced engineering practices including:

- **Multi-provider Authentication System** - Email/password + OAuth (Google, GitHub) with email verification and password reset flows
- **Subscription Billing Architecture** - Integrated payment processing with webhook-driven subscription lifecycle management
- **Type-Safe Database Layer** - PostgreSQL with Drizzle ORM, featuring relational schemas, migrations, and proper foreign key constraints
- **Modern React Architecture** - React 19 with Server Components, Server Actions, and optimized client-side state management
- **Production-Ready Email System** - React Email templates with Resend integration for transactional emails
- **Responsive UI Framework** - Shadcn UI components with Tailwind CSS v4, Framer Motion animations, and dark mode support

## 🏗️ Architecture Highlights

### Authentication System
Implemented a robust authentication layer using Better Auth with custom plugins:
- **Custom temp-mail blocker plugin** to prevent disposable email registrations
- **Multi-factor authentication flows** including email verification and password reset
- **OAuth integration** with Google and GitHub providers
- **Session management** with secure token generation and validation
- **Email OTP** for secure email changes and verification

### Database Design
Architected a normalized PostgreSQL schema with proper relationships:
- **User management** with profile data, email verification status, and subscription tracking
- **OAuth account linking** for seamless social provider authentication
- **Session management** with proper expiration and cleanup
- **Subscription lifecycle tracking** with status management (active, cancelled, on_hold)

### Payment Integration
Built a complete subscription billing system:
- **Lazy customer creation** at checkout to optimize database operations
- **Webhook-driven subscription updates** handling multiple payment events
- **Plan management** with automatic status transitions
- **Customer portal integration** for subscription management

### Type Safety & Developer Experience
- **Absolute import paths** with `@/` prefix for cleaner imports
- **Direct imports** (no barrel files) for optimal build performance
- **Comprehensive TypeScript types** across all layers
- **Biome linting** for consistent code quality

## 🚀 Quick Start

### 1. Install Dependencies

```bash
bun install
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
- `NEXT_PUBLIC_APP_URL` - Your app URL (http://localhost:3000 for development)

Optional OAuth configuration (email authentication works independently):
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - Google OAuth credentials
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` - GitHub OAuth credentials
- `NEXT_PUBLIC_GOOGLE_ENABLED` - Set to "true" to show Google sign-in button
- `NEXT_PUBLIC_GITHUB_ENABLED` - Set to "true" to show GitHub sign-in button

**Note:** Email authentication works without OAuth. OAuth providers are completely optional and won't affect email sign-in/sign-up.

### 3. Initialize Database

Push your database schema to your PostgreSQL database:

```bash
bun run db:push
```

This command will sync your database schema with the tables defined in `db/schema/`.

### 4. Run Development Server

```bash
bun run dev
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

## 💻 Tech Stack

### Core Framework
- **Next.js 16.1.1** - React framework with App Router, Server Components, and Server Actions
- **React 19.2.3** - Latest React with concurrent features and automatic optimizations
- **TypeScript 5.0+** - End-to-end type safety and enhanced developer experience

### Database & ORM
- **PostgreSQL** - Production-grade relational database
- **Drizzle ORM 0.44.7** - Type-safe SQL toolkit with migrations and schema management
- **Drizzle Kit** - Database migration and studio tools

### Authentication & Authorization
- **Better Auth 1.4.0** - Modern authentication library with plugin architecture
- **Custom Plugins** - Temp-mail blocker, email OTP, and OAuth providers
- **OAuth Providers** - Google and GitHub integration

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework with modern features
- **Shadcn UI** - Beautiful, accessible component library built on Radix UI
- **Radix UI** - Unstyled, accessible UI primitives
- **Framer Motion 12.23.24** - Production-ready motion library for React
- **React Icons 5.5.0** - Comprehensive icon library

### Email & Notifications
- **React Email 1.0.1** - Build and send emails using React components
- **Resend 6.5.2** - Email delivery API
- **Sonner 2.0.7** - Beautiful toast notifications

### Payments & Billing
- **Dodo Payments 2.6.0** - Payment processing and subscription management
- **@dodopayments/better-auth 1.4.0** - Better Auth plugin for payment integration

### Development Tools
- **Bun** - Fast JavaScript runtime and package manager (migrated from pnpm)
- **Biome 2.3.6** - Fast linter and formatter (replacing ESLint/Prettier)
- **TypeScript** - Strict type checking and intelligent code completion

### Additional Libraries
- **Zod 4.1.12** - Schema validation and type inference
- **Recharts 3.4.1** - Composable charting library
- **Huge Icons React 0.3.0** - Icon component library
- **Class Variance Authority 0.7.1** - Variant-based styling for components
- **clsx & tailwind-merge 3.4.0** - Conditional class utilities

## ✨ Key Features

### Authentication & Security
- **Multi-provider login** with email/password, Google OAuth, and GitHub OAuth
- **Email verification** workflow with OTP-based email changes
- **Secure password reset** flow with email notifications
- **Custom temp-mail blocker** to prevent disposable email registrations
- **Session management** with secure token generation and automatic cleanup
- **Type-safe database schema** with proper foreign key constraints

### Billing & Subscriptions
- **Subscription management** with Dodo Payments integration
- **Webhook-driven updates** for subscription lifecycle events (active, cancelled, on_hold)
- **Customer portal** for self-service subscription management
- **Lazy customer creation** to optimize database operations
- **Plan-based access control** with feature flags
- **Automatic billing** with retry logic for failed payments

### User Experience
- **Responsive design** optimized for mobile, tablet, and desktop
- **Dark mode** support with system preference detection
- **Smooth animations** with Framer Motion
- **Toast notifications** with Sonner
- **Loading states** and optimistic UI updates
- **Accessible components** following WCAG guidelines

### Developer Experience
- **Hot module replacement** for instant feedback during development
- **Type-safe database queries** with Drizzle ORM
- **Server Actions** for mutations with progressive enhancement
- **Biome** for fast linting and formatting
- **Absolute imports** with clean `@/` path aliases
- **Direct imports** (no barrel files) for optimal build performance

## 🔒 Security Considerations

### Authentication Security
- **Environment-based secrets** for token generation
- **Secure session cookies** with httpOnly and secure flags
- **CSRF protection** built into Better Auth
- **Rate limiting** on authentication endpoints
- **Password hashing** with secure algorithms

### API Security
- **Server Actions** for type-safe, authenticated mutations
- **Input validation** with Zod schemas
- **SQL injection prevention** through parameterized queries (Drizzle ORM)
- **XSS protection** with React's automatic escaping
- **Environment variable validation** at startup

### Data Privacy
- **GDPR-compliant** data handling
- **User data isolation** with proper tenant separation
- **Email verification** to prevent account hijacking
- **Secure password reset** with time-limited tokens
- **OAuth token security** with proper storage and refresh

## 📊 Performance Optimizations

### Database Optimizations
- **Indexed fields** on frequently queried columns (email, userId)
- **Connection pooling** with pg driver
- **Lazy loading** for optional customer data
- **Efficient queries** with proper joins and relations

### Frontend Optimizations
- **Server Components** for reduced JavaScript bundle size
- **Code splitting** with Next.js automatic optimization
- **Image optimization** with Next.js Image component
- **Font optimization** with next/font
- **CSS optimization** with Tailwind CSS v4 JIT compiler

### Build Optimizations
- **Direct imports** to avoid barrel file overhead
- **Tree shaking** for unused code elimination
- **Minified production builds** with Terser
- **Asset optimization** with automatic compression

## 🚀 Deployment Guide

### Database Setup (Before First Deploy)

**Important:** Set up your production database before deploying:

1. **Create PostgreSQL Database**
   - Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or any PostgreSQL provider

2. **Run Migrations**
   ```bash
   # Set your production DATABASE_URL
   export DATABASE_URL="postgresql://user:pass@host:5432/db"

   # Apply migrations to production database
   bun run db:push
   ```

### Deploy on Vercel (Recommended)

1. **Push to GitHub** (or GitLab/Bitbucket)

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository

3. **Configure Environment Variables**
   Add these in Vercel project settings:
   - `DATABASE_URL` - Your production database connection string
   - `BETTER_AUTH_SECRET` - Generate with `openssl rand -base64 32`
   - `BETTER_AUTH_URL` - Your production URL (e.g., `https://yourapp.vercel.app`)
   - OAuth credentials (if using Google/GitHub login)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app

**Note:** Database migrations are automatically run during build (configured in package.json).

### Deploy on Other Platforms

For other platforms (Railway, Render, AWS, etc.), ensure:
- Node.js 18+ is available
- All environment variables are configured
- Database migrations are applied before starting the app
- Build command: `bun run build`
- Start command: `bun start`

## 📝 Development Workflow

### Code Quality

```bash
# Lint code
bun run lint

# Auto-fix linting issues
bun run lint:fix
```

### Database Management

```bash
# Push schema changes to database
bun run db:push

# Generate migration files
bun run db:generate

# Apply migrations
bun run db:migrate

# Open Drizzle Studio (database GUI)
bun run db:studio
```

### Development Server

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun start
```

## 🧪 Testing & Quality Assurance

### Type Safety
- **Strict TypeScript** configuration with `noImplicitAny` and `strictNullChecks`
- **End-to-end type inference** from database schema to frontend components
- **Zod schemas** for runtime validation with TypeScript integration

### Code Quality
- **Biome linting** for consistent code style and formatting
- **TypeScript compiler checks** on every build
- **ESLint rules** (via Biome) for best practices
- **Pre-commit hooks** (recommended) for automated quality checks

## 🔮 Future Enhancements

### Planned Features
- **Multi-tenancy** support for B2B SaaS
- **Advanced analytics** dashboard
- **Webhook system** for third-party integrations
- **API rate limiting** with Redis
- **Background job processing** with BullMQ
- **Real-time features** with WebSockets/Server-Sent Events
- **Advanced audit logging** for compliance
- **Feature flags** system with remote configuration

### Scalability Improvements
- **Database read replicas** for query scaling
- **CDN integration** for static asset delivery
- **Edge caching** with Next.js Edge Runtime
- **Database connection pooling** optimization
- **Horizontal scaling** support with stateless architecture

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Documentation](https://better-auth.com)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [React Email Documentation](https://react.email)

### Learning Resources
- [Learn Next.js](https://nextjs.org/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [React Server Components Guide](https://react.dev/reference/react/use-server)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Authentication powered by [Better Auth](https://better-auth.com)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Icons from [Huge Icons](https://hugeicons.com/)
- Payments by [Dodo Payments](https://dodopayments.com/)

---

**Built with ❤️ using modern web technologies and best practices**
