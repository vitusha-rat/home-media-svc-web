export function formatEta(seconds: number | null | undefined): string {
  if (seconds === null || seconds === undefined || seconds < 0) {
    return "∞";
  }

  if (seconds === 0) {
    return "0s";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours}h`);
  }

  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }

  if (secs > 0 && hours === 0) {
    parts.push(`${secs}s`);
  }

  return parts.join(" ") || "0s";
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "-";

  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
