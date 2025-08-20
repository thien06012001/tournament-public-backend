export function statusFromDates(
  now: Date,
  start?: Date | null,
  end?: Date | null
) {
  if (!start || !end) return "unknown" as const;
  if (now < start) return "upcoming" as const;
  if (now > end) return "completed" as const;
  return "ongoing" as const;
}
