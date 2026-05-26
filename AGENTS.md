<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:flowcfo-project-rules -->

# Data Fetching Pattern

All backend API calls must go through `lib/api-client.ts` (`apiClient`) which:
- Auto-injects the BetterAuth session token via `authClient.getSession()`
- Handles JSON serialization (except FormData — detected automatically)
- Throws `ApiError` with `.status` and `.data` on non-ok responses

Define API functions in `lib/api/*.ts` files and expose them via hooks in `hooks/api/use-*.ts` using React Query.

**Files:**
- `lib/api/users.ts` — `usersApi`, `adminApi`, `accountsApi` functions
- `hooks/api/use-user.ts` — `useUser`, `useUpdateUser`, `useSetupUser`
- `hooks/api/use-admin.ts` — `useAdminDashboard`, `useAdminWaitlist`, `useAdminContacts`, `useAdminUsers`, `useAdminEvents`
- `hooks/api/use-accounts.ts` — `useUploadCsv`
- `hooks/api/use-public.ts` — waitlist/contact hooks (reference)

**Rules of Hooks:** All `useEffect`, `useState`, `useRef`, `useCallback`, etc. must be called unconditionally at the top level of the component — never after an early return.

# Signup Flow

1. `authClient.signUp.email(...)` — BetterAuth creates the user
2. If no token returned (email verification required), redirect to `/signin?verify=email`
3. If token returned, call `useSetupUser().mutateAsync({ terms_accepted })` via `usersApi.setupUser()` → `POST /api/v1/users/setup`
4. Redirect to `/onboarding`

The `/accept-terms` page is the fallback path (token-gated, scroll-to-bottom to accept).

# Backend Endpoints

- `POST /api/v1/users/setup` — creates backend user with `terms_accepted` (replaces old `PATCH /users/me` for setup)
- `POST /api/v1/accounts/csv/upload` — FormData file upload, returns `{ status, account_id, transactions }`
- `GET /api/v1/admin/dashboard` — returns `AdminDashboard` stats

# Email Verification

- BetterAuth config: `sendVerificationOnSignUp: true`, `autoSignInAfterVerification: true` in `lib/auth.ts`
- OTP sent via Resend only (no dev console fallback)
- Verify email UI: `/signin?verify=email` route with 6-digit OTP input

<!-- END:flowcfo-project-rules -->
