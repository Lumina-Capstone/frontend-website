# Task List: Supabase Pause Prevention

- [ ] Task 1: Add `.github/workflows/supabase-keepalive.yml`
  - Acceptance: daily cron + `workflow_dispatch`; skips cleanly without secrets; fails on network/4xx/5xx; no credentials in file.
  - Verify: YAML parses; shell step reviewed; push to `main`.
- [ ] Task 2: Add repo secrets `SUPABASE_URL`, `SUPABASE_ANON_KEY` (human, 2 min)
  - Acceptance: both secrets exist under Settings -> Secrets and variables -> Actions.
- [ ] Task 3: Manual run of the workflow (human, 1 min)
  - Acceptance: job is green and logs say `Supabase OK (HTTP 200)`.
  - If 401/403: replace the key with the service-role key or add a read policy.
- [ ] Task 4: Confirm activity in the Supabase dashboard after the first run
  - Acceptance: project shows recent activity; pause countdown reset.
