# For Startups

A Polish-language radar of actionable opportunities for startups: grants,
competitions, accelerators, cloud/AI/SaaS credits, corporate pilots and
market-access programmes.

**Live site:** https://for-startups.pages.dev/

## What this repository is

This repository is a **derived public artifact**. It contains:

- the static public site (homepage, one stable page per opportunity, an archive);
- a machine-readable catalog export (`apps/web/src/data/catalog.json`) and the
  JSON schema it satisfies (`schemas/opportunity.schema.json`);
- a generated `sitemap.xml` and `robots.txt`.

It is **not** the private intelligence backend that fetches, verifies,
normalizes and scores sources. That process runs separately; this repository is
the safe, published result.

## What you will find

- **Current and upcoming opportunities** for Poland, the EU and global
  programmes that Polish startups can apply to.
- **One page per opportunity** with its application dates, eligibility,
  benefits and links to the authoritative first-party sources.
- **An archive** of closed and unconfirmed records, kept truthful rather than
  deleted.

## Update frequency

The catalog is refreshed **every day at 14:00 Europe/Warsaw**. New candidate
sources are researched **twice a week** and only enter the catalog after
operator review and the normal evidence pipeline.

## Data principles

- Every fact is linked to the authoritative source it came from.
- Unknown values are shown as *unknown*; nothing is invented or filled in.
- A date without a source time is shown as a date, never with an invented time.
- An expected future call based on past editions is labelled as an expectation,
  never as an officially announced call.

## Freshness

Each record carries a freshness signal — `FRESH`, `AGING`, `STALE` or
`UNKNOWN` — derived from when its source was last polled. Records that have not
been re-checked recently say so instead of pretending to be current.

## Limitations

- The catalog reflects what the sources published; it is not an endorsement and
  not a guarantee of eligibility or funding.
- Third-party source pages can change or disappear; the catalog links to them
  rather than reproducing them.
- The catalog data is derived from third-party sources and remains subject to
  their terms. This repository grants no license over that data.

## License

The repository currently ships no license. Code and data licensing are being
decided separately; nothing here should be assumed to be freely reusable yet.
