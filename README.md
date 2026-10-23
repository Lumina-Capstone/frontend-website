# Lumina Web

React SPA for **Lumina**, a receipt-scanning and egg-production tracker for a small farm business. It signs users in with Firebase, lets them scan and review receipt line items, and shows production and finance dashboards backed by the Lumina FastAPI service.

- Live: <https://frontend-website-capstone.pages.dev>
- Backend API: <https://agungibr-lumina-ml-capstone.hf.space>

## Features

- Firebase Auth: email/password, Google sign-in, password reset.
- Upload and scan receipts (`income` / `expense`); JPEG/PNG only, client-side downscaling before upload.
- Review extracted items, edit them, optional AI cleanup (`/ocr/autocorrect`), then save to the backend.
- Dashboard with production and finance charts (Recharts).
- Records list with edit/delete.
- Settings and account screens; Indonesian UI copy.

## Stack

React 19, TypeScript, Vite 8, Tailwind CSS 3, React Router 7, Firebase 13, Recharts, Vitest + Testing Library.

## Quick start

```powershell
npm install
Copy-Item .env.example .env   # fill in the Firebase values
npm run dev
```

The dev server runs at `http://localhost:5173`, which is allowed by the backend CORS configuration.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | yes | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | yes | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | yes | Must match the project used by the backend service account (`lumina-web-c1cba`) |
| `VITE_FIREBASE_STORAGE_BUCKET` | yes | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | yes | Firebase sender ID |
| `VITE_FIREBASE_APP_ID` | yes | Firebase app ID |
| `VITE_API_BASE_URL` | no | Backend base URL, no trailing slash. Defaults to the hosted Space. |

Secrets are not committed; `.env` is gitignored. Production values are configured in Cloudflare Pages.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) and build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint over the repository |
| `npm test` | Vitest in watch mode |
| `npx vitest run` | Run the test suite once |
| `npx vitest run --coverage` | Coverage report |

## Architecture

```text
src/
  App.tsx                  Routing (public + protected routes)
  main.tsx                 React root
  pages/
    Landing.tsx            Marketing/landing page
    SignIn.tsx             Email/password + Google sign-in
    SignUp.tsx             Registration
    ForgotPassword.tsx     Password reset email
    Dashboard.tsx          Production/finance charts
    Upload.tsx             Receipt upload, extraction, review, save
    Records.tsx            Saved records list (edit/delete)
    Settings.tsx           Account settings
  components/              DashboardLayout, Toast, ConfirmDialog
  services/
    auth.ts                Firebase SDK setup, sign-in/up/reset/logout, local session snapshot
    apiClient.ts           Authenticated fetch wrapper (attaches Firebase ID token)
  utils/
    authErrors.ts          Indonesian error messages for Firebase auth codes
    imageResize.ts         Downscale receipt photos before upload
    formatRupiah.ts        Currency formatting
    lineItems.ts           Item normalization/helpers
```

### Auth and API calls

1. `services/auth.ts` initializes Firebase and exports sign-in helpers.
2. Protected pages are only reachable when signed in; unauthenticated users are redirected to `/signin`.
3. `apiFetch` (`services/apiClient.ts`) reads the current Firebase user, obtains an ID token, attaches `Authorization: Bearer <token>`, and calls `${VITE_API_BASE_URL}/<path>`.
4. The backend verifies the token and enforces its `ADMIN_EMAILS` allowlist. A `401` means the session/token is not accepted; a `403` means the signed-in email is not allowed by the backend.

### Upload flow

`Upload.tsx` resizes the photo (`utils/imageResize.ts`), posts it as `multipart/form-data` to `/ocr/income` or `/ocr/expenses`, shows the extracted items for review, and persists the result with `POST /ocr/save`. The backend returns a `Server-Timing` header that is useful when verifying pipeline performance in DevTools.

## Security headers and CSP

`public/_headers` applies to Cloudflare Pages deployments:

- no framing (`X-Frame-Options: DENY`, `frame-ancestors 'none'`), `nosniff`, no referrer, HSTS;
- a strict CSP with `script-src 'self'`, Google Fonts for styles/fonts, and `connect-src` limited to Firebase endpoints plus the backend Space.

Adding a new backend origin or a third-party script requires updating this file and redeploying.

Cloudflare Web Analytics may inject `beacon.min.js`, which the CSP blocks. The resulting console message is harmless; disable Web Analytics in Cloudflare if it is not wanted.

## Deployment (Cloudflare Pages)

- Project: `frontend-website-capstone`; build command `npm run build`, output directory `dist`.
- Set all `VITE_*` variables in the Pages project (production and preview environments as needed).
- `VITE_FIREBASE_PROJECT_ID` must be the same Firebase project whose service account the backend uses; a mismatch makes every authenticated API call fail with `401 Token tidak valid.` (see the backend deployment docs).
- Pushes to the repository branch configured in Pages trigger a new deployment; use the Cloudflare dashboard to roll back.

## Supabase keep-alive workflow

`.github/workflows/supabase-keepalive.yml` performs a daily authenticated query to keep the free Supabase project from pausing:

- triggers: cron `17 3 * * *` and manual `workflow_dispatch`;
- requires GitHub Actions secrets `SUPABASE_URL` and `SUPABASE_ANON_KEY` (publishable/read-only key is enough);
- skips with a notice when the secrets are missing, fails the run on non-2xx responses.

**Activation is pending:** add the two repository secrets and run the workflow once; the log should end with `Supabase OK (HTTP 200)`. These are GitHub secrets, separate from the backend Space secrets.
