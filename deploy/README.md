# For Startups — deployment configuration

The public product is a **static Astro site**. There is no server-side runtime
in production, so it is deployed to Cloudflare Pages as a static/edge artifact.
Everything that requires a machine — fetching, change detection, extraction,
canonicalization, translation, source discovery — stays on the VPS.

```
VPS (source of truth)                    Cloudflare (public edge)
---------------------                    -----------------------
for-startups-private  ──export gate──▶   for-startups-public (GitHub)
data pipeline                           Pages project: for-startups
catalog/current                         HTTPS + CDN + cache
frontend build  ──────────────────────▶  static dist/ upload
systemd timers                          rollback = previous deployment
```

## Cloudflare

* Project: `for-startups` (Cloudflare Pages, direct upload).
* Authentication: `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` from the
  operator's existing Cloudflare credentials. The token is never stored in this
  repository and never exported.
* Commands used by the release:

```bash
# deploy the built site
npx wrangler pages deploy dist --project-name=for-startups

# list deployments (rollback source)
npx wrangler pages deployment list --project-name=for-startups

# roll back to a previous known-good deployment
npx wrangler pages deployment rollback <DEPLOYMENT_ID> --project-name=for-startups
```

## Rollback

Every release keeps the previous deployment on Cloudflare; a new upload never
destroys the last known-good artifact. The release verification step checks the
public URL *content* (not just HTTP 200) before the previous deployment is
considered superseded. If verification fails, the previous deployment ID is
rolled back.

## Schedules

| Timer | When (Europe/Warsaw) | Purpose |
|---|---|---|
| `for-startups-daily.timer` | daily 14:00 | full production pipeline + frontend rebuild |
| `for-startups-discovery-council.timer` | Tue + Fri 09:30 | bounded Source Discovery Council |

The council runs at 09:30, four and a half hours before the daily run, so a slow
research pass can never overlap or delay the production pipeline.
