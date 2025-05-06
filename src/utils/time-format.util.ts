export function formatTime(time: string) {
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr.padStart(2, "0");

  const ampm = hour >= 12 ? "PM" : "AM";
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;

  return `${hour}:${minute} ${ampm}`;
}

export const toMinutes = (time: string) => {
  const [hour, min] = time.split(":").map(Number);
  return hour * 60 + min;
};
