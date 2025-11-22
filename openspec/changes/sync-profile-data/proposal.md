# Change: Sync Profile Data

## Why

The current profile page relies on mock data, making it non-functional for real users. We need to persist user profile changes to the database and provide feedback (Undo capability) to ensure a smooth user experience.

## What Changes

- Extend database schema (`users` table) to support `firstName`, `lastName`, `timezone`, `language`, and `use24Hour`.
- Connect `PersonalDetails`, `Preferences`, and `SecuritySettings` components to `better-auth` data and actions.
- Implement an "Undo" mechanism using optimistic updates and toast notifications.

## Impact

- Affected specs: `user-schema`, `user-profile`
- Affected code:
  - `db/schema/users.ts`
  - `app/profile/page.tsx` and children components
  - `auth/auth-client.ts` (usage)
