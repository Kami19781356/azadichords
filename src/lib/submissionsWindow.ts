// Song submissions open on 19 October 2026, 00:00 Paris time (UTC+2).
// SUBMISSIONS_OPEN_AT (ISO date-time, server env) overrides it — handy
// for testing the form before the opening day.
export function submissionsOpenAt(): Date {
  const raw = process.env.SUBMISSIONS_OPEN_AT;
  const d = raw ? new Date(raw) : null;
  return d && !Number.isNaN(d.getTime()) ? d : new Date("2026-10-19T00:00:00+02:00");
}

export function submissionsAreOpen(now = new Date()): boolean {
  return now >= submissionsOpenAt();
}
