---
name: flowcfo-api-integration
description: Add or change FlowCFO frontend integrations with backend APIs, authentication, financial data, or partner-facing endpoints.
---

# FlowCFO API integration rules

Use for browser-to-backend flows, API docs, ingestion, notifications, admin data, and partner demonstrations.

## Existing architecture

- Follow the nearest `AGENTS.md`. Frontend API calls go through `lib/api-client.ts` (`apiClient`) and named functions in `lib/api/*.ts`; expose view state through the existing React Query hooks where appropriate.
- Preserve BetterAuth session handling and backend authorization. Never put service credentials, provider keys, signing secrets, or privileged tokens in browser code or committed files.
- Treat untrusted content as untrusted: validate input types, file size/type, tenant/owner scope, and server-side limits. Do not trust a customer/tenant ID supplied by the browser without authorization checks.
- Respect FormData handling and the shared `ApiError` contract. Model loading, empty, validation, timeout and server-error states explicitly.

## Financial-data integrity

- Keep deterministic calculations separate from LLM explanation. AI may summarize approved signals; it must not silently invent balances, dates, forecasts, eligibility, or product recommendations.
- Preserve source timestamps, currency, provenance and uncertainty. Handle duplicate imports, timezone boundaries, missing data, reversals and stale balances deliberately.
- Financial actions, notifications and recommendations need idempotency, audit context, opt-out/consent controls where relevant, and human review proportional to risk.
- Clearly label mocked or synthetic data. A UI mock, fixture, or API response is not evidence of a live customer or bank integration.

## Integration workflow

1. Read the backend endpoint/schema and existing frontend client patterns before editing.
2. Document request, response, auth, error, rate/size limits and data ownership assumptions.
3. Add typed client/service code and tests for success, malformed input, auth failure and network/server failure.
4. Keep secrets in environment/secret stores and update example configuration without exposing values.
5. Test with non-sensitive fixtures; do not use real customer financial data in screenshots or demo fixtures.

## API claims

Do not call an API “fully compliant,” “bank-ready,” “secure,” or production-ready without a defined standard, controls, evidence, and deployment context. Describe exact verified routes and limitations instead.
