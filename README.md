# For Startups

For Startups is a daily opportunity radar for startups.

It finds, verifies, normalizes and matches opportunities that can provide
a startup with money, infrastructure, software, customers, market access,
knowledge or other material business value.

## Core principle

This is NOT a startup-news aggregator.

We care about:

- grants,
- competitions,
- accelerators and incubators,
- cloud / AI / API / SaaS credits,
- startup discounts,
- corporate pilots and challenges,
- export and internationalisation programmes,
- market-access programmes,
- investor-access programmes,
- meaningful mentoring or technical programmes.

We do NOT care about:

- startup funding news,
- acquisitions,
- "startup X raised Y",
- founder interviews,
- generic ecosystem news,
- rankings without an actionable application opportunity,
- expired historical articles with no active or upcoming application path.

## Initial market

Primary:

- Poland

Secondary:

- EU opportunities available to Polish startups
- global opportunities available to Polish startups

## Architecture

VPS (private, canonical):
- systemd user timers: daily pipeline at 14:00 Europe/Warsaw, source-discovery
  council on Tuesday + Friday at 09:30 Europe/Warsaw
- fetching, change detection, extraction, classification, verification,
  canonical promotion, catalog publication
- Polish summary translation behind a content-addressed cache
- static frontend build + atomic release publish
- operator notifications over the existing Telegram bot (reused, never new)

Public (derived artifact, fail-closed export):
- static Astro site: catalog, stable opportunity pages, archive, sitemap,
  robots, Open Graph
- `schemas/opportunity.schema.json` so anyone can validate the catalog
- nothing reaches the public remote unless `scripts/public_export_gate.py`
  returns `GATE=PASS`

Live site: https://for-startups.pages.dev/

## Model policy

FREE_ONLY.

Deterministic processing first.
Models only where semantic interpretation is required.
No paid fallback without an explicit future decision.

`scripts/model_policy.py` is the single allowlist; the pipeline, translator,
discovery council and the product verifier all refuse any model outside it.

## Schedule

Daily target: 14:00 Europe/Warsaw (DST-aware, never a fabricated 23:59 for a
date-only source).

Pipeline:

SOURCE
  -> FETCH
  -> CHANGE DETECTION
  -> CANDIDATE
  -> OPPORTUNITY / NOISE
  -> EXTRACTION
  -> NORMALIZATION
  -> DEDUPLICATION
  -> VERIFICATION
  -> ENRICHMENT (lifecycle, slugs, timestamps, Polish summaries)
  -> MATCHING
  -> PUBLISH

## Public product semantics

- Lifecycle statuses are explicit; `EXPECTED_RECURRENCE` is never presented as
  an officially announced call.
- A date without a source time is published as a date, never with an invented
  time.
- `UNKNOWN` is not `NO`: unconfirmed items live in a separately labelled
  archive group, not silently mixed with closed programmes.
- Geography badges are derived from eligibility, not from provider HQ.

Full Polish documentation for readers: [PUBLIC_CATALOG.md](PUBLIC_CATALOG.md).

## Commands

```bash
# tests
python3 -m pytest tests/ -q

# production reconcile + one run
bash scripts/install_product_v01.sh --production --run-now

# production verification
python3 scripts/verify_product_v01.py --production

# public export gate (fail closed)
python3 scripts/public_export_gate.py

# frontend rebuild from the published catalog
bash scripts/build_frontend.sh
```
