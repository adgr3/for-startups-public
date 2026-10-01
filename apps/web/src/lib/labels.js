// Polish labels for the schema enums. Unknown values fall back to the raw code
// so the UI never silently mislabels a fact.
//
// Official programme and brand names are NEVER translated — they are data, not
// prose. Only enum labels and generated UI copy live here.

export const STATUS_LABELS = {
  OPEN: 'Otwarte',
  ROLLING: 'Stały nabór',
  UPCOMING: 'Wkrótce',
  UPCOMING_CONFIRMED: 'Nadchodzący nabór',
  EXPECTED_RECURRENCE: 'Spodziewany nabór',
  CLOSED: 'Zamknięte',
  PAUSED: 'Wstrzymane',
  UNKNOWN: 'Nieznany',
};

export const STATUS_HINTS = {
  UPCOMING_CONFIRMED: 'Termin otwarcia ogłoszony przez oficjalne źródło.',
  EXPECTED_RECURRENCE: 'Na podstawie wcześniejszych edycji — nie jest oficjalnie ogłoszonym naborem.',
  ROLLING: 'Nabór ciągły — można aplikować bez terminu granicznego.',
  UNKNOWN: 'Status niepotwierdzony przez źródło.',
};

export const STATUS_CLASS = {
  OPEN: 'status-open',
  ROLLING: 'status-rolling',
  UPCOMING: 'status-upcoming',
  UPCOMING_CONFIRMED: 'status-upcoming',
  EXPECTED_RECURRENCE: 'status-recurrence',
  CLOSED: 'status-closed',
  PAUSED: 'status-paused',
  UNKNOWN: 'status-unknown',
};

// Geography is derived from *eligibility*, never from where a provider happens
// to have its headquarters.
//
// The visible label is plain text (it is also searched against); the badge mark
// lives in GEOGRAPHY_BADGES as a self-contained inline SVG, because flag emoji
// render differently — or not at all — depending on the reader's platform, and
// the same badge has to look identical in the browser, in a screenshot and in
// an archive copy.
export const GEOGRAPHY_LABELS = {
  POLAND: 'Polska',
  EU: 'Unia Europejska',
  EUROPE: 'Europa',
  GLOBAL: 'Globalny',
  COUNTRY_SPECIFIC: 'Wybrane kraje',
  REGIONAL: 'Region',
  UNKNOWN: 'Nieznany',
};

// 12-point star, drawn once and rotated around the ring for the EU mark.
const EU_STAR =
  'M8 4.15l.78 1.58 1.75.25-1.26 1.24.3 1.74L8 8.09l-1.57.83.3-1.74-1.26-1.24 1.75-.25z';
const EU_STARS = Array.from(
  { length: 12 },
  (_, i) => `<path d="${EU_STAR}" transform="rotate(${i * 30} 8 8)" fill="#ffcc00"/>`,
).join('');

const svg = (body) =>
  `<svg class="geo-svg" viewBox="0 0 16 16" width="14" height="14" ` +
  `aria-hidden="true" focusable="false">${body}</svg>`;

export const GEOGRAPHY_BADGES = {
  POLAND: svg(
    '<path d="M1 8V3.5A2.5 2.5 0 0 1 3.5 1h9A2.5 2.5 0 0 1 15 3.5V8z" fill="#ffffff"/>' +
      '<path d="M1 8h14v3.5A2.5 2.5 0 0 1 12.5 14h-9A2.5 2.5 0 0 1 1 11.5z" fill="#dc143c"/>' +
      '<rect x="1" y="1" width="14" height="13" rx="2.5" fill="none" stroke="#7d86a3"/>',
  ),
  EU: svg(
    '<rect x="1" y="1" width="14" height="14" rx="2.5" fill="#003399"/>' + EU_STARS,
  ),
  EUROPE: svg(
    '<circle cx="8" cy="8" r="7" fill="#003399"/>' +
      `<path d="${EU_STAR}" fill="#ffcc00"/>`,
  ),
  GLOBAL: svg(
    '<circle cx="8" cy="8" r="7" fill="#4aa8ff" fill-opacity=".16" stroke="#4aa8ff"/>' +
      '<ellipse cx="8" cy="8" rx="3.2" ry="7" fill="none" stroke="#4aa8ff"/>' +
      '<path d="M1 8h14M2.3 4.6h11.4M2.3 11.4h11.4" fill="none" stroke="#4aa8ff"/>',
  ),
  COUNTRY_SPECIFIC: svg(
    '<rect x="1" y="1" width="14" height="14" rx="3" fill="none" stroke="currentColor" stroke-dasharray="3 2"/>' +
      '<rect x="3.4" y="4" width="4.2" height="3.4" rx="1" fill="currentColor"/>' +
      '<rect x="8.4" y="8.6" width="4.2" height="3.4" rx="1" fill="currentColor"/>',
  ),
  REGIONAL: svg(
    '<path d="M8 1.6a4.7 4.7 0 0 0-4.7 4.7c0 3.4 4.7 8.1 4.7 8.1s4.7-4.7 4.7-8.1A4.7 4.7 0 0 0 8 1.6z" fill="none" stroke="currentColor"/>' +
      '<circle cx="8" cy="6.3" r="1.8" fill="currentColor"/>',
  ),
  UNKNOWN: svg(
    '<circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-dasharray="3 2"/>' +
      '<text x="8" y="11.2" text-anchor="middle" font-size="9" font-family="inherit" fill="currentColor">?</text>',
  ),
};

export function geographyBadge(scope) {
  return GEOGRAPHY_BADGES[scope] || GEOGRAPHY_BADGES.UNKNOWN;
}

export const GEOGRAPHY_PLAIN = GEOGRAPHY_LABELS;

export const BENEFIT_LABELS = {
  CASH_GRANT: 'Dotacja pieniężna',
  CASH_PRIZE: 'Nagroda pieniężna',
  CLOUD_CREDITS: 'Kredyty chmurowe',
  AI_API_CREDITS: 'Kredyty AI / API',
  SAAS_CREDITS: 'Kredyty SaaS',
  COMPUTE: 'Moc obliczeniowa',
  DISCOUNT: 'Zniżka',
  HARDWARE: 'Sprzęt',
  MENTORING: 'Mentoring',
  TRAINING: 'Szkolenia',
  CUSTOMER_ACCESS: 'Dostęp do klientów',
  PILOT: 'Pilotaż',
  INVESTOR_ACCESS: 'Dostęp do inwestorów',
  MARKET_ACCESS: 'Wejście na rynek',
  PROMOTION: 'Promocja',
  OTHER: 'Inne',
};

export const OPPORTUNITY_TYPE_LABELS = {
  GRANT: 'Dotacja',
  COMPETITION: 'Konkurs',
  ACCELERATOR: 'Akcelerator',
  INCUBATOR: 'Inkubator',
  CLOUD_CREDITS: 'Kredyty chmurowe',
  AI_API_CREDITS: 'Kredyty AI / API',
  SAAS_CREDITS: 'Kredyty SaaS',
  COMPUTE_CREDITS: 'Kredyty obliczeniowe',
  DISCOUNT: 'Zniżka',
  HARDWARE_BENEFIT: 'Sprzęt',
  CORPORATE_PILOT: 'Pilotaż korporacyjny',
  CORPORATE_CHALLENGE: 'Wyzwanie korporacyjne',
  EXPORT_PROGRAM: 'Program eksportowy',
  MARKET_ACCESS: 'Wejście na rynek',
  INVESTOR_ACCESS: 'Dostęp do inwestorów',
  MENTORING: 'Mentoring',
  TRAINING: 'Szkolenia',
  OTHER: 'Inne',
};

export const APPLICANT_LABELS = {
  FOUNDER: 'Założyciel',
  TEAM: 'Zespół',
  STARTUP: 'Startup',
  COMPANY: 'Firma',
  SME: 'MŚP',
  ACCELERATOR: 'Akcelerator',
  OPERATOR: 'Operator',
  INVESTOR: 'Inwestor',
  OTHER: 'Inne',
  UNKNOWN: 'Nieznane',
};

export const LEGAL_FORM_LABELS = {
  INDIVIDUAL: 'Osoba fizyczna',
  PRE_COMPANY_TEAM: 'Zespół przed spółką',
  JDG: 'JDG',
  SP_Z_OO: 'Sp. z o.o.',
  PSA: 'Prosta spółka akcyjna',
  SA: 'S.A.',
  OTHER_COMPANY: 'Inna forma',
  ANY_BUSINESS: 'Dowolna działalność',
  UNKNOWN: 'Nieznana',
};

export const COMPANY_STAGE_LABELS = {
  IDEA: 'Pomysł',
  PROTOTYPE: 'Prototyp',
  POC: 'PoC',
  MVP: 'MVP',
  PRE_REVENUE: 'Przed przychodami',
  FIRST_REVENUE: 'Pierwsze przychody',
  GROWTH: 'Wzrost',
  SCALEUP: 'Skalowanie',
  UNKNOWN: 'Nieznany',
};

export const FUNDING_STAGE_LABELS = {
  BOOTSTRAPPED: 'Bootstrap',
  PRE_SEED: 'Pre-seed',
  SEED: 'Seed',
  SERIES_A: 'Series A',
  SERIES_B: 'Series B',
  SERIES_C_PLUS: 'Series C+',
  ANY: 'Dowolny',
  UNKNOWN: 'Nieznany',
};

export const CONFIDENCE_LABELS = {
  HIGH: 'Wysoka',
  MEDIUM: 'Średnia',
  LOW: 'Niska',
  UNKNOWN: 'Nieznana',
};

export const TIMESTAMP_LABELS = {
  discovered_at: 'Dodano do katalogu',
  last_changed_at: 'Ostatnia zmiana rekordu',
  last_checked_at: 'Ostatnie sprawdzenie źródła',
  last_verified_at: 'Ostatnia weryfikacja',
  opens_at: 'Start naboru',
  closes_at: 'Koniec naboru',
};

export function label(map, value, fallback = 'Nieznane') {
  if (value === null || value === undefined || value === '') return fallback;
  return map[value] || value;
}
