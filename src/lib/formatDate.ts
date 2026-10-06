import type { Locale } from "./content.types";

// Gregorian dates in both languages (the Persian site uses Persian
// digits and month names, but stays on the Gregorian calendar).
const INTL_LOCALE: Record<Locale, string> = {
  en: "en-US",
  fa: "fa-IR-u-ca-gregory",
};

function toDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

function formatter(locale: Locale, withYear = true) {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    day: "numeric",
    month: "long",
    ...(withYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  });
}

export function formatDate(iso: string, locale: Locale): string {
  return formatter(locale).format(toDate(iso));
}

export function formatDateRange(
  start: string,
  end: string | undefined,
  locale: Locale,
): string {
  if (!end || end === start) return formatDate(start, locale);
  return formatter(locale).formatRange(toDate(start), toDate(end));
}

export function formatDayMonth(iso: string, locale: Locale): string {
  return formatter(locale, false).format(toDate(iso));
}

export function formatIndex(n: number, locale: Locale, pad = 2): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    minimumIntegerDigits: pad,
    useGrouping: false,
  }).format(n);
}
