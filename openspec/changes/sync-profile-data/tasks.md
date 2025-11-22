## 1. Database

- [x] 1.1 Update `db/schema/users.ts` to include `firstName`, `lastName`, `timezone`, `language`, `use24Hour`.
- [x] 1.2 Run `pnpm db:generate` and `pnpm db:push` (or equivalent) to update database.
- [x] 1.3 Verify `better-auth` configuration in `auth/auth.ts` includes these fields in session or add an endpoint to fetch them.

## 2. Frontend Integration

- [x] 2.1 Create `hooks/use-profile-update.ts` hook to handle optimistic updates and Undo logic with `sonner`.
- [x] 2.2 Refactor `app/profile/page.tsx` to fetch initial user data (e.g. `useSession`).
- [x] 2.3 Update `components/profile/PersonalDetails.tsx` to use `useProfileUpdate` and remove mock data.
- [x] 2.4 Update `components/profile/Preferences.tsx` to use `useProfileUpdate` and remove mock data.
- [x] 2.5 Update `components/profile/SecuritySettings.tsx` to use `better-auth` password update and remove mock email state.
- [x] 2.6 Update `components/profile/SocialAccountsCard.tsx` to list actual linked accounts.

## 3. Verification

- [x] 3.1 Verify profile data persists after refresh.
- [x] 3.2 Verify Undo button reverts changes in UI and DB.
