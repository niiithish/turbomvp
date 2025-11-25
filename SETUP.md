# 🚀 Setup Guide - TurboMVP

Complete setup guide to get your AI SaaS up and running in minutes.

## Prerequisites

- **Node.js** 18+ installed
- **pnpm** installed (`npm install -g pnpm`)
- **PostgreSQL** database (local or cloud provider like Neon, Supabase, or Railway)

## Step-by-Step Setup

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd turbomvp

# Install dependencies
pnpm install
```

### 2. Database Setup

#### Option A: Using Neon (Recommended for beginners)

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string (it looks like: `postgresql://user:password@host/database`)

#### Option B: Using Supabase

1. Go to [supabase.com](https://supabase.com) and create a project
2. Go to Project Settings → Database
3. Copy the "Connection string" (choose "Session mode")

#### Option C: Local PostgreSQL

```bash
# Install PostgreSQL locally, then create a database
createdb turbomvp_dev
```

Your connection string will be: `postgresql://localhost:5432/turbomvp_dev`

### 3. Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` and fill in these **required** variables:

```bash
# Database
DATABASE_URL="postgresql://your-connection-string-here"

# Auth Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET="your-random-secret-here"

# App URLs
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Optional** - Add these if you want OAuth login:

```bash
# Google OAuth (get from: https://console.cloud.google.com)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth (get from: https://github.com/settings/developers)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email (get from: https://resend.com)
RESEND_API_KEY="re_your-api-key"
EMAIL_FROM="noreply@yourdomain.com"

# Dodo Payments (get from: https://app.dodopayments.com)
DODO_PAYMENTS_API_KEY="your-api-key"
DODO_PAYMENTS_WEBHOOK_SECRET="your-webhook-secret"
```

### 4. Initialize Database Schema

Push the database schema to your PostgreSQL database:

```bash
pnpm db:push
```

This creates all necessary tables (`user`, `account`, `session`) in your database.

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) - you should see your landing page! 🎉

### 6. Test Authentication

1. Click "Sign Up" to create an account
2. Use email/password or OAuth (if configured)
3. You'll be redirected to the dashboard

## 📝 Quick Commands Reference

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm db:push          # Sync schema to database
pnpm db:studio        # Open Drizzle Studio (database GUI)
pnpm db:generate      # Generate migrations (advanced)

# Code Quality
pnpm lint             # Check for issues
pnpm lint:fix         # Auto-fix issues
```

## 🔧 Troubleshooting

### "Connection refused" or database errors

- ✅ Check your `DATABASE_URL` is correct
- ✅ Ensure your database is running (if local)
- ✅ Verify your IP is whitelisted (if using cloud database)

### "BETTER_AUTH_SECRET is required"

- ✅ Generate a secret: `openssl rand -base64 32`
- ✅ Add it to `.env.local`

### OAuth login not working

- ✅ Verify your OAuth credentials are correct
- ✅ Check redirect URIs in OAuth provider settings:
  - Development: `http://localhost:3000/api/auth/callback/google`
  - Production: `https://yourdomain.com/api/auth/callback/google`

### Email verification not sending

- ✅ Add `RESEND_API_KEY` and `EMAIL_FROM` to `.env.local`
- ✅ Verify your sending domain in Resend dashboard

## 🎨 Customization

### Update Branding

1. Edit `config/site.ts` for site metadata
2. Update logo in `public/` directory
3. Modify colors in `app/globals.css`

### Add Database Tables

1. Create new schema file in `db/schema/`
2. Export it from `db/schema/index.ts`
3. Run `pnpm db:push` to sync

### Modify Pricing Plans

Edit `config/pricing.ts` to update your pricing tiers.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy! ✨

Vercel will automatically run `pnpm db:push` during build (configured in `package.json`).

### Other Platforms

Make sure to:
- Set all environment variables
- Run `pnpm db:push` or `pnpm db:migrate` before starting the app
- Use Node.js 18+

## 📚 Next Steps

- [ ] Customize your landing page (`app/page.tsx`)
- [ ] Add your AI features to the dashboard
- [ ] Configure Dodo Payments for subscription billing (see below)
- [ ] Configure email templates in `components/emails/`
- [ ] Add your logo and brand colors
- [ ] Set up analytics (Vercel Analytics, PostHog, etc.)

## 💳 Dodo Payments Setup

To enable Pro plan subscriptions:

### 1. Create a Dodo Payments Account

1. Go to [app.dodopayments.com](https://app.dodopayments.com) and create an account
2. Complete the onboarding process

### 2. Get Your API Keys

1. Navigate to Settings → API Keys
2. Copy your **API Key** (use test mode for development)
3. Add it to `.env.local` as `DODO_PAYMENTS_API_KEY`

### 3. Create Your Product

1. Go to Products → Create Product
2. Create a subscription product for your Pro plan
3. Copy the **Product ID** (starts with `pdt_`)
4. Update `config/pricing.ts` with your product ID:

```typescript
{
  id: "pro",
  dodoProductId: "pdt_your_product_id_here",
  // ... other fields
}
```

### 4. Configure Webhooks

1. Go to Settings → Webhooks
2. Add a new webhook endpoint: `https://yourdomain.com/api/auth/dodopayments/webhooks`
3. Copy the **Webhook Secret**
4. Add it to `.env.local` as `DODO_PAYMENTS_WEBHOOK_SECRET`

### 5. Test the Integration

1. Use test mode API keys
2. Click "Get Started" on the Pro plan
3. Complete a test checkout
4. Verify your subscription status updates

## 💡 Need Help?

- Check the [README.md](./README.md) for project structure
- Review [Better Auth docs](https://better-auth.com)
- Check [Drizzle ORM docs](https://orm.drizzle.team)
- Check [Dodo Payments docs](https://docs.dodopayments.com)

Happy building! 🚀
