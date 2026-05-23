# SyncUT - Master Operating Guide

This document is the operational source of truth for SyncUT. It defines the real project structure, squad boundaries, delivery flow, and the rules teams must follow before contributing code or documentation.

## 1. Project Goal

SyncUT is a university platform built as a modular monorepo. The system supports authentication, dashboards, appointments, justifications, and notifications under a shared design and data model.

## 2. Technology Stack

- Frontend: Next.js App Router + TypeScript.
- UI: Tailwind CSS + Shadcn UI / Radix UI.
- Backend and data: Supabase PostgreSQL, Auth, Storage, and Edge Functions.
- Email: Resend.
- Hosting and previews: Vercel.
- Monorepo tooling: pnpm + Turborepo.

## 3. Real Repository Structure

```text
SyncUT/
├── apps/
│   └── web/
│       ├── app/
│       │   ├── (auth)/
│       │   ├── (citas)/
│       │   ├── (justificaciones)/
│       │   ├── (notificaciones)/
│       │   └── (dashboard)/
│       ├── components/
│       │   ├── ui/
│       │   └── modules/
│       ├── lib/
│       └── public/
├── packages/
│   ├── config/
│   ├── sdk/
│   ├── shared/
│   ├── types/
│   └── ui/
├── supabase/
│   ├── migrations/
│   └── tests/
├── docs/
└── scripts/
```

## 4. Squad Ownership

### Squad 2 - Authentication and Audit

Scope:
- Login, signup, profiles, middleware, roles, RLS, audit logs, session protection.

Primary paths:
- [apps/web/app/(auth)](apps/web/app/%28auth%29)
- [apps/web/middleware.ts](apps/web/middleware.ts)
- [supabase/migrations](supabase/migrations)
- [packages/sdk](packages/sdk)
- [packages/types](packages/types)

### Squad 3 - Appointments

Scope:
- Appointment booking, calendar, availability, collisions, listing, detail views.

Primary paths:
- [apps/web/app/(citas)](apps/web/app/%28citas%29)
- [apps/web/components/modules](apps/web/components/modules)

### Squad 4 - Notifications

Scope:
- Notification center, notification history, email dispatch, queues, webhooks, settings.

Primary paths:
- [apps/web/app/(notificaciones)](apps/web/app/%28notificaciones%29)
- [packages/shared](packages/shared)
- [supabase/migrations](supabase/migrations)

### Squad 1 - Justifications

Scope:
- Justification requests, file upload, approval flow, traceability, storage policies.

Primary paths:
- [apps/web/app/(justificaciones)](apps/web/app/%28justificaciones%29)
- [supabase/migrations](supabase/migrations)
- [supabase/tests](supabase/tests)

### Staff Dashboard

Scope:
- Shared dashboard views by role, quick stats, module grid, activity feed.

Primary paths:
- [apps/web/app/(dashboard)](apps/web/app/%28dashboard%29)
- [apps/web/components/modules](apps/web/components/modules)

## 5. Delivery Rules for All Teams

### Before starting work

Every task must include:
- A clear module owner.
- A route or file path.
- A short description of the screen or behavior.
- Dependencies on other squads.
- Acceptance criteria.

### What each squad must deliver

- A module README.
- Screen descriptions or mockups.
- Components, hooks, services, or types required by the module.
- Tests or validation notes when the task affects behavior.

### Contribution rules

- Keep changes inside the squad boundary unless the task explicitly requires cross-squad integration.
- Do not rename shared routes or folders without updating this guide.
- Do not introduce new patterns if an existing shared pattern already exists.
- Prefer small, reviewable PRs.
- Do not merge code that depends on unfinished work without a stub, mock, or contract.
- **State Management (Zustand):** Local module state goes in `(modulo)/hooks/useModuloStore.ts`. Shared cross-module state goes in `packages/shared/src/stores/`.
- **Backend & Server Actions:** All data mutations or server-side logic must be written as Server Actions under `(modulo)/actions/` or API Routes under `apps/web/app/api/`.
- **Testing:** Unit tests (Vitest) must reside next to the files they test (e.g. `Component.test.tsx` next to `Component.tsx`). E2E tests (Playwright) go in the global `apps/web/e2e/` folder.
- **Supabase Edge Functions:** Any background/serverless triggers must be stored in `supabase/functions/` and maintained by the responsible squad.
- **Environment Variables:** All teams must refer to `.env.example` in the root to configure their local development environments. Do not commit actual secrets to the repository.

## 6. Recommended Workflow

1. Define the screen or feature in docs first.
2. Confirm dependencies and route ownership.
3. Build the mockup or screen contract.
4. Implement the UI and supporting logic.
5. Add or update tests.
6. Review for consistency with the shared system.
7. Merge only after the dependency chain is satisfied.

## 7. Ready for Squad Contributions

The project is ready for module-based contributions if these conditions are true:

- The route ownership matches the real repo structure.
- Each squad works only in its module boundary.
- The shared dashboard and auth dependencies are respected.
- Mockups and screen definitions exist before implementation.
- Supabase schema changes are coordinated and reviewed.

If any of these conditions are not met, the task should stay in planning until the blocker is removed.