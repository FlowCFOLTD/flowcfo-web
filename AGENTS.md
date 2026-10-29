<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:flowcfo-project-rules -->

# Reusable FlowCFO Skills

Before substantial work in these areas, read the matching repository skill in `.agents/skills/`:

- `flowcfo-brand-ui` — visual design, components, marketing/auth/admin/product surfaces, logos.
- `flowcfo-editorial` — blog research, writing, comparisons, product-claim guardrails.
- `flowcfo-seo` — metadata, structured data, social images and crawl/index behavior.
- `flowcfo-api-integration` — frontend/backend contracts, auth, data integrity and financial flows.
- `flowcfo-enterprise-demo` — bank/platform demos, ingestion, alerts and technical rehearsal.

These repository skills are the source of truth for future AI-assisted work. Update them when the product’s design or integration conventions materially change.

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

<!-- BEGIN:vertical-work-rules -->

# Vertical Work Rules

Before adding, removing, or modifying any vertical (freelancer, agency, startup, ecommerce, restaurant):

1. **Read the vertical status doc first** — `verticals/vertical-<name>.md` contains known issues, fixed bugs, and pending items specific to that vertical.

2. **Understand the business type** — Answer in writing: what is this business? What financial metrics uniquely matter to them? What concepts would be meaningless?

3. **Map every dashboard field** — For each field the dashboard returns, explain why it exists for THIS vertical. A field present in another vertical is NOT a reason to add it here.

4. **Never "fix" to match** — Do not change a vertical just to make it look like another. Every difference between verticals should be explainable as an intentional business distinction, not an oversight.

5. **Check the date range pattern** — Verify `thirty` and `ninety` are computed relative to `data_end`, not a hardcoded `today()`. Use `max(end - timedelta(...), data_start)` when the business has fewer days of data than the lookback window.

6. **Wire mappings** — If the vertical has defined category keyword lists (`OVERHEAD_CATEGORIES`, `TAX_KEYWORDS`, etc.), ensure `_expand_from_mappings()` is called so user custom mappings are respected. Don't leave keyword lists as dead code.

7. **Cash flow loop** — The cash flow loop should include the current day: use `range((end - thirty).days)` or clamp dates to `[thirty, end]`, not `range(30)` which drops the last day.

<!-- END:vertical-work-rules -->
