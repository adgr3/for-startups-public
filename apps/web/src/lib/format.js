// Deterministic, timezone-aware formatting helpers for the public product.
//
// Contract:
//  * a DATE-only value is always rendered as a date. We never invent 23:59 or
//    any other time that the authoritative source did not state;
//  * a DATETIME value renders with its local time and the Europe/Warsaw label;
//  * the daily schedule is 14:00 Europe/Warsaw and is computed with the real
//    DST rules of that zone (CEST/CET), not a fixed UTC offset.

export const CATALOG_TZ = 'Europe/Warsaw';
export const DAILY_RUN_HOUR = 14;

const TZ_FORMATTERS = new Map();

function partsFormatter(tz) {
  if (!TZ_FORMATTERS.has(tz)) {
    TZ_FORMATTERS.set(tz, new Intl.DateTimeFormat('en-CA', {
      timeZone: tz,
      hour12: false,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    }));
  }
  return TZ_FORMATTERS.get(tz);
}

export function wallClock(tz, instant) {
  const date = instant instanceof Date ? instant : new Date(instant);
  const parts = {};
  for (const part of partsFormatter(tz).formatToParts(date)) {
    if (part.type !== 'literal') parts[part.type] = Number(part.value);
  }
  if (parts.hour === 24) parts.hour = 0;
  return {
    year: parts.year, month: parts.month, day: parts.day,
    hour: parts.hour, minute: parts.minute, second: parts.second,
  };
}

// Offset (ms) of `tz` at the given UTC instant: (wall clock as if UTC) - instant.
export function zoneOffsetMs(tz, instantMs) {
  const w = wallClock(tz, instantMs);
  const asUtc = Date.UTC(w.year, w.month - 1, w.day, w.hour, w.minute, w.second);
  return asUtc - instantMs;
}

// Convert a wall-clock time in `tz` to a UTC instant, resolving DST by
// iterating twice (sufficient for every real-world offset transition).
export function wallToInstant(tz, year, month, day, hour, minute) {
  let guess = Date.UTC(year, month - 1, day, hour, minute, 0);
  for (let i = 0; i < 3; i += 1) {
    const utc = guess - zoneOffsetMs(tz, guess);
    const refined = Date.UTC(year, month - 1, day, hour, minute, 0) - zoneOffsetMs(tz, utc);
    if (refined === guess) break;
    guess = refined;
  }
  return guess;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

export function formatDate(iso) {
  if (!iso) return null;
  const text = String(iso);
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(text);
  if (!match) return text;
  return `${match[3]}.${match[2]}.${match[1]}`;
}

// Renders an application date. `precision` is DATE | DATETIME | NONE. A DATE
// value never gains a time component.
export function formatDeadline(iso, precision) {
  if (!iso) return null;
  const first = String(iso).split('|')[0].trim();
  const rest = String(iso).split('|').slice(1).map((v) => v.trim()).filter(Boolean);
  const render = (value) => {
    const datePart = formatDate(value);
    if (precision === 'DATETIME' && /\d{2}:\d{2}/.test(value)) {
      const time = /(\d{2}:\d{2})/.exec(value)[1];
      const offset = /(Z|[+-]\d{2}:?\d{2})$/.exec(value);
      return `${datePart}, ${time}${offset && offset[1] !== 'Z' ? ` ${offset[1]}` : ' CET/CEST'}`;
    }
    return datePart;
  };
  const head = render(first);
  if (!rest.length) return head;
  return [head, ...rest.map(render)].join(' · ');
}

// "DD.MM.YYYY, HH:MM TZ" for a real instant (catalog / schedule timestamps).
export function formatStamp(iso, tz = CATALOG_TZ) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const w = wallClock(tz, date);
  const offsetMin = Math.round(zoneOffsetMs(tz, date.getTime()) / 60000);
  const label = offsetMin === 120 ? 'CEST' : offsetMin === 60 ? 'CET' : `UTC${offsetMin >= 0 ? '+' : ''}${offsetMin / 60}`;
  return `${pad(w.day)}.${pad(w.month)}.${w.year}, ${pad(w.hour)}:${pad(w.minute)} ${label}`;
}

// The next scheduled 14:00 Europe/Warsaw run strictly after `now`.
export function nextDailyRun(now = new Date(), hour = DAILY_RUN_HOUR, tz = CATALOG_TZ) {
  const start = now instanceof Date ? now : new Date(now);
  const w = wallClock(tz, start.getTime());
  let candidate = wallToInstant(tz, w.year, w.month, w.day, hour, 0);
  if (candidate <= start.getTime()) {
    const next = new Date(Date.UTC(w.year, w.month - 1, w.day) + 86400000);
    const n = wallClock(tz, next.getTime());
    candidate = wallToInstant(tz, n.year, n.month, n.day, hour, 0);
  }
  return new Date(candidate);
}

// Whole days remaining until `iso` (date-only semantics: the day of the
// deadline still counts as available). null when unknown or already past.
export function daysRemaining(iso, now = new Date(), tz = CATALOG_TZ) {
  if (!iso) return null;
  const first = String(iso).split('|')[0].trim();
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(first);
  if (!match) return null;
  const start = now instanceof Date ? now : new Date(now);
  const today = wallClock(tz, start.getTime());
  const due = wallToInstant(tz, Number(match[1]), Number(match[2]), Number(match[3]), 23, 59);
  const diff = due - start.getTime();
  if (diff < 0) return 0;
  const todayStart = wallToInstant(tz, today.year, today.month, today.day, 0, 0);
  const dueStart = wallToInstant(tz, Number(match[1]), Number(match[2]), Number(match[3]), 0, 0);
  return Math.round((dueStart - todayStart) / 86400000);
}

// "Nabór rusza za X dni" — only for a real, known opening date.
export function startsInDays(iso, now = new Date(), tz = CATALOG_TZ) {
  if (!iso) return null;
  const first = String(iso).split('|')[0].trim();
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(first);
  if (!match) return null;
  const start = now instanceof Date ? now : new Date(now);
  const today = wallClock(tz, start.getTime());
  const todayStart = wallToInstant(tz, today.year, today.month, today.day, 0, 0);
  const openStart = wallToInstant(tz, Number(match[1]), Number(match[2]), Number(match[3]), 0, 0);
  const days = Math.round((openStart - todayStart) / 86400000);
  if (days > 0) return days;
  if (days === 0) return 0;
  return null;
}
