import fs from 'node:fs';
import path from 'node:path';

// The catalog is a production-generated data file. It is never hand-edited and
// never committed: the pipeline writes it, the build reads it.
const DATA_DIR = process.env.FOR_STARTUPS_DATA_DIR
  ? path.resolve(process.env.FOR_STARTUPS_DATA_DIR)
  : path.resolve(process.cwd(), 'src/data');

export function loadCatalog() {
  let items = [];
  let meta = {};
  let loaded = false;
  try {
    const parsed = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'catalog.json'), 'utf8'));
    if (Array.isArray(parsed)) {
      items = parsed;
      loaded = true;
    }
  } catch {
    items = [];
  }
  try {
    meta = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'meta.json'), 'utf8'));
  } catch {
    meta = {};
  }
  // `loaded` distinguishes a published-but-empty catalog from a read/parse
  // failure, so the UI can show a truthful empty state instead of an outage.
  return { items, meta, loaded };
}

// The catalog view: open, rolling, and both flavours of upcoming. EXPECTED_
// RECURRENCE is always labelled as an expectation, never as an announced call.
export const ACTIVE_STATUSES = ['OPEN', 'ROLLING', 'UPCOMING', 'UPCOMING_CONFIRMED', 'EXPECTED_RECURRENCE'];
export const UPCOMING_STATUSES = ['UPCOMING_CONFIRMED', 'EXPECTED_RECURRENCE'];
export const INACTIVE_STATUSES = ['CLOSED', 'PAUSED', 'UNKNOWN'];

export function isActive(item) {
  return ACTIVE_STATUSES.includes(item.status);
}

export function isUpcoming(item) {
  return UPCOMING_STATUSES.includes(item.status);
}

export function isRealSource(item) {
  return typeof item.canonical_url === 'string' && /^https?:\/\//.test(item.canonical_url);
}

export function unknownSet(item) {
  const fields = item?.projection?.unknown_fields;
  return new Set(Array.isArray(fields) ? fields : []);
}

// --- filter groups -------------------------------------------------------

const GEO_FILTERS = {
  pl: ['POLAND'],
  eu: ['EU', 'EUROPE'],
  global: ['GLOBAL'],
};

// One group per benefit taxonomy value, never a bucket of several: "credits"
// used to swallow cloud, AI, SaaS, compute and discount under one ambiguous
// label, so a reader could not tell what the filter would actually return.
// Exported because the client-side filter must use the *same* table — a second
// copy in the page is a second thing to forget.
export const TYPE_GROUPS = {
  grant: ['GRANT'],
  accelerator: ['ACCELERATOR', 'INCUBATOR'],
  cloud: ['CLOUD_CREDITS'],
  ai: ['AI_API_CREDITS'],
  saas: ['SAAS_CREDITS'],
  compute: ['COMPUTE_CREDITS'],
  discount: ['DISCOUNT'],
  pilot: ['CORPORATE_PILOT', 'CORPORATE_CHALLENGE'],
};

const FUNDED_STAGES = ['PRE_SEED', 'SEED', 'SERIES_A', 'SERIES_B', 'SERIES_C_PLUS'];

export function matchesGroup(item, group, value) {
  if (!value) return true;
  if (group === 'geo') {
    return (GEO_FILTERS[value] || []).includes(item?.geography?.scope);
  }
  if (group === 'type') {
    const types = new Set(item?.opportunity_types || []);
    return (TYPE_GROUPS[value] || []).some((t) => types.has(t));
  }
  if (group === 'status') {
    if (value === 'UPCOMING') return isUpcoming(item);
    return item?.status === value;
  }
  if (group === 'entity') {
    const forms = item?.eligibility?.legal_forms || [];
    if (value === 'jdg') return forms.includes('JDG');
    if (value === 'company') return forms.some((f) => ['SP_Z_OO', 'PSA', 'SA', 'OTHER_COMPANY'].includes(f));
    return false;
  }
  if (group === 'funding') {
    const stages = item?.eligibility?.funding_stages || [];
    const external = item?.eligibility?.external_funding_required;
    if (value === 'bootstrap') return stages.includes('BOOTSTRAPPED') || external === 'NO';
    if (value === 'funded') return external === 'YES' || stages.some((s) => FUNDED_STAGES.includes(s));
    return false;
  }
  return true;
}

// Only render a filter the catalog can actually answer, so the UI never offers
// a choice that yields an empty result because the data does not exist.
export function supportedValues(items, group) {
  const present = new Set();
  for (const item of items) {
    if (group === 'geo') {
      for (const key of Object.keys(GEO_FILTERS)) if (matchesGroup(item, 'geo', key)) present.add(key);
    } else if (group === 'type') {
      for (const key of Object.keys(TYPE_GROUPS)) if (matchesGroup(item, 'type', key)) present.add(key);
    } else if (group === 'status') {
      for (const key of ['OPEN', 'UPCOMING', 'ROLLING']) if (matchesGroup(item, 'status', key)) present.add(key);
    } else if (group === 'entity') {
      for (const key of ['jdg', 'company']) if (matchesGroup(item, 'entity', key)) present.add(key);
    } else if (group === 'funding') {
      for (const key of ['bootstrap', 'funded']) if (matchesGroup(item, 'funding', key)) present.add(key);
    }
  }
  return [...present];
}

export const SORTS = {
  recent: 'ostatnio dodane',
  oldest: 'najstarsze',
  deadline_asc: 'najbliższy termin zakończenia',
  deadline_desc: 'najdalszy termin zakończenia',
  opens_asc: 'najbliższy termin rozpoczęcia',
};

// discovered_at is "when we first saw it". opens_at / closes_at are application
// dates. They are never interchangeable and never mixed in one sort key.
const SORT_KEYS = {
  recent: (i) => i?.timestamps?.discovered_at || i?.projection?.canonical?.created_at,
  oldest: (i) => i?.timestamps?.discovered_at || i?.projection?.canonical?.created_at,
  deadline_asc: (i) => i?.lifecycle?.closes_at || i?.dates?.application_deadline_at,
  deadline_desc: (i) => i?.lifecycle?.closes_at || i?.dates?.application_deadline_at,
  opens_asc: (i) => i?.lifecycle?.opens_at || i?.dates?.application_open_at,
};

const DESCENDING = new Set(['recent', 'deadline_desc']);

export function sortItems(items, sortKey) {
  const keyFn = SORT_KEYS[sortKey] || SORT_KEYS.recent;
  const direction = DESCENDING.has(sortKey) ? -1 : 1;
  const decorated = items.map((item, index) => ({ item, index, value: keyFn(item) }));
  decorated.sort((a, b) => {
    // Records without the key always sink to the bottom, in stable order.
    if (!a.value && !b.value) return a.index - b.index;
    if (!a.value) return 1;
    if (!b.value) return -1;
    if (a.value === b.value) return a.index - b.index;
    return a.value < b.value ? -direction : direction;
  });
  return decorated.map((row) => row.item);
}

export function searchBlob(item) {
  return String(item.__search || '').toLowerCase();
}
