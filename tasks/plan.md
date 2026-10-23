# Implementation Plan: Supabase Free-Plan Pause Prevention

## Overview
Supabase pauses free-plan projects after a stretch of inactivity. The backend keeps Supabase busy only when someone scans or saves a receipt, so a quiet period can pause the project and break the app until it is restored manually from the dashboard. Add a scheduled GitHub Actions job that performs one authenticated query per day, which keeps the project active with no user traffic and alerts us if Supabase is unreachable.

## Architecture Decisions
- **Host:** GitHub Actions cron in `frontend-website` (the only GitHub-hosted repo; the backend lives on HuggingFace, which has no scheduler and sleeps when idle, so it cannot keep Supabase awake).
- **Frequency:** daily at 03:17 UTC plus manual `workflow_dispatch`. Supabase's free-plan pause threshold is 7 days of inactivity, so daily gives a 7x safety margin and costs one tiny request per run.
- **Probe:** `GET /rest/v1/records?select=id&limit=1` with `apikey` + `Authorization: Bearer`. A real PostgREST query guarantees database activity; `/auth/v1/health` alone may not touch Postgres.
- **Credentials:** repository secrets `SUPABASE_URL` and `SUPABASE_ANON_KEY` (publishable key). No secrets in the workflow file. If RLS rejects the anon role, the same secret slot can hold the service-role key.
- **Failure behavior:** if secrets are missing the job skips with a notice (no failure spam before setup). If the request fails or returns 4xx/5xx the job fails, which surfaces an already-paused or misconfigured project in the Actions tab.
- **Reliability:** curl retries 3x with backoff; GitHub may delay scheduled runs by minutes, which is irrelevant at this cadence. GitHub disables schedules in public repos after 60 days of repo inactivity, so `workflow_dispatch` remains as the manual fallback.

## Task List

### Phase 1: Keep-alive workflow
- [ ] Task 1: Add `.github/workflows/supabase-keepalive.yml` (cron + dispatch, guarded skip, single REST probe, non-2xx fails)
- [ ] Task 2: Validate YAML locally and review the shell step

### Checkpoint: Workflow in repo
- [ ] YAML parses without errors
- [ ] File committed and pushed to `main` (schedules only run from the default branch)

### Phase 2: Activation (human steps)
- [ ] Task 3: Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` repository secrets (Settings -> Secrets and variables -> Actions)
- [ ] Task 4: Run the workflow once via *Run workflow* and confirm a green run

### Checkpoint: Verified
- [ ] Manual run returns `Supabase OK (HTTP 200)`
- [ ] Supabase dashboard shows the request / project stays active past 7 days

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Project is already paused | Probe fails, app down | Restore once from the Supabase dashboard; the daily probe then keeps it active |
| RLS blocks anon reads | Probe returns 401/403 | Use the service-role key in the `SUPABASE_ANON_KEY` secret (or add a read policy); the probe itself is harmless |
| GitHub pauses schedules after 60 days of repo inactivity | Silent stop | `workflow_dispatch` fallback; any normal push re-enables scheduled runs |
| Anon key rotation (legacy JWT -> publishable key) | 401 from the gateway | Use the current publishable key from Project Settings -> API |

## Open Questions
- Does the project still use legacy `anon` keys or the new `sb_publishable_...` key? Either works; use whichever the dashboard currently shows.
