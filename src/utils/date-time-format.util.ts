export function formatTime(time: string) {
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr.padStart(2, "0");

  const ampm = hour >= 12 ? "PM" : "AM";
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;

  return `${hour}:${minute} ${ampm}`;
}

export function formatUTCTime(utcString: string) {
  const date = new Date(utcString); // Parse as UTC

  return new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export const toMinutes = (time: string) => {
  const [hour, min] = time.split(":").map(Number);
  return hour * 60 + min;
};

export const formatDate = (date: string) => {
  const localDate = utcToLocalDate(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Intl.DateTimeFormat("en-US", options).format(localDate);
};

export const utcToLocalDate = (utcString: string): Date => {
  return new Date(utcString);
};

export function getDurationInMinutes(
  fromDateUtc: string,
  toDateUtc?: string
): string {
  const from = new Date(fromDateUtc);
  const to = toDateUtc ? new Date(toDateUtc) : new Date();

  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    throw new Error(
      "Invalid date format. Please provide valid UTC date strings."
    );
  }

  const diffMs = to.getTime() - from.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  return `${diffMinutes} mins`;
}
