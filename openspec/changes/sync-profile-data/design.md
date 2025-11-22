# Design: Profile Data Sync & Undo

## Problem

The current profile page (`app/profile/page.tsx`) uses hardcoded mock data. We need to synchronize this with the database using `better-auth` and `drizzle-orm`. Additionally, the user requires an "Undo" capability for profile updates.

## Solution

1.  **Schema Extension**:

    - Extend the `users` table in `db/schema/users.ts` to include missing fields required by the profile UI:
      - `firstName`: text (Optional, or split from `name`) -> _Decision_: We will add `firstName` and `lastName` to the schema to match the UI. `name` in `better-auth` can be a concatenation or kept as display name.
      - `timezone`: text (default 'utc')
      - `language`: text (default 'en')
      - `use24Hour`: boolean (default true)
    - Run `drizzle-kit generate` and `migrate` (or push) to update DB.

2.  **Data Fetching**:

    - Use `better-auth/react`'s `useSession` hook to fetch the current user data on the client.
    - Pre-fill the forms in `PersonalDetails`, `Preferences`, etc., with this data.

3.  **Data Updates & Undo**:

    - Create a reusable `useProfileUpdate` hook or utility.
    - **Flow**:
      1.  User changes a value (e.g., changes Last Name).
      2.  **Optimistic Update**: Update local state immediately.
      3.  **API Call**: Call `authClient.updateUser` (or a custom server action if `updateUser` is insufficient for custom fields) with the new data.
      4.  **Toast**: Show a `sonner` toast: "Profile updated" with an "Undo" button.
      5.  **Undo Action**:
          - If user clicks "Undo":
            - Revert local state to original value.
            - Call API again with the original value.
            - Show toast "Update undone".

4.  **Component Refactoring**:
    - `PersonalDetails`: Bind to `user.firstName`, `user.lastName`, `user.image`.
    - `Preferences`: Bind to `user.timezone`, `user.language`, `user.use24Hour`.
    - `SecuritySettings`: Bind to `user.email`. Password change uses `authClient.changePassword`.
    - `SocialAccountsCard`: Bind to `session.user` linked accounts (Better Auth usually manages linked accounts separately, we might need to fetch linked accounts list if not in session). _Note_: `better-auth` session might not include full list of linked providers by default. We may need `authClient.listAccounts` or similar if available, or a server action.

## Technical Decisions

- **Better Auth Custom Fields**: `better-auth` allows additional fields in the user table. We just need to ensure they are included in the session or fetched separately. We will configure `better-auth` to include these fields in the session if possible, or fetch them via a separate query if the session object is too slim.
- **Undo Strategy**: We will use "Revert" strategy (Apply change -> Undo reverts it) rather than "Delay" strategy (Wait -> Apply), as it feels more responsive.
