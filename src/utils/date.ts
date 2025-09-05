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

export function formatDateForGrouping(date: Date): string {
  return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
}

export function getMatchDateTime(match: {
  matchDate?: Date | null;
  startTime?: Date | null;
  createdAt: Date;
}): Date {
  return match.matchDate || match.startTime || match.createdAt;
}

export function formatDateDisplay(date: string): string {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
