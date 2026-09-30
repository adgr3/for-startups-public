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
export const GEOGRAPHY_LABELS = {
  POLAND: '🇵🇱 Polska',
  EU: '🇪🇺 Unia Europejska',
  EUROPE: '🇪🇺 Europa',
  GLOBAL: '🌍 Globalny',
  COUNTRY_SPECIFIC: '🏳️ Wybrane kraje',
  REGIONAL: '🗺️ Region',
  UNKNOWN: '❔ Nieznany',
};

export const GEOGRAPHY_PLAIN = {
  POLAND: 'Polska',
  EU: 'Unia Europejska',
  EUROPE: 'Europa',
  GLOBAL: 'Globalny',
  COUNTRY_SPECIFIC: 'Wybrane kraje',
  REGIONAL: 'Regionalny',
  UNKNOWN: 'Nieznany',
};

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
