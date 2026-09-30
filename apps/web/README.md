# For Startups — Astro frontend

Polish, static-first frontend over the **production-generated** opportunity
catalog. There is no mock data and no hand-copied records: the build reads
`src/data/catalog.json`, which is written only by `scripts/export_frontend_data.py`
from the published `catalog/current` release.

## Data boundary

```
daily pipeline -> data/catalog/current (atomic release)
              -> scripts/public_product_v2.py   (slugs, lifecycle, timestamps, summary_pl)
              -> scripts/export_frontend_data.py -> apps/web/src/data/catalog.json
              -> astro build -> frontend/current (atomic release) -> static/edge hosting
```

`apps/web/src/data/catalog.json` and `meta.json` are generated artifacts: they
are git-ignored in the private repository and shipped as a **public catalog
snapshot** by the public export gate.

## Views

| Route | Purpose |
|---|---|
| `/` | catalog: search, filters, sorting, plus the prominent **Nadchodzące nabory** section |
| `/opportunities/<slug>/` | stable individual opportunity page with full facts and evidence |
| `/historia/` | archive, in two labelled groups: **Status niepotwierdzony** (UNKNOWN) and **Zamknięte i wstrzymane** (CLOSED / PAUSED) |
| `/sitemap.xml`, `/robots.txt` | SEO surface |

## Layout contract

| Viewport | Cards per row |
|---|---|
| desktop (> 1024px) | 3 |
| tablet (681–1024px) | 2 |
| mobile (≤ 680px) | 1 |

The grid is CSS-only. Every card is server-rendered, so the catalog stays fully
usable without JavaScript; JavaScript only re-filters, re-sorts and re-counts.

## Build

```bash
bash scripts/build_frontend.sh --prod-root "$FOR_STARTUPS_PROD_ROOT"
```

## Data integrity in the UI

* official programme names are never translated;
* Polish prose lives in `summary_pl`, generated only when the underlying source
  facts change;
* a date-only deadline is rendered as a date, never with an invented time;
* unknown values render as „nieznane”, never as „nie” or „0”.
