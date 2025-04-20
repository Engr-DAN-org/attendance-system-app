import { startHour, stepMinutes } from "@/constants/section.constants";

export function getSlotIndex(time: string) {
  const [timePart, meridian] = time.split(" ");
  const [hourStr, minuteStr] = timePart.split(":").map(Number);
  let hour = Number(hourStr);
  const minute = Number(minuteStr);

  if (meridian === "PM" && hour !== 12) hour += 12;
  if (meridian === "AM" && hour === 12) hour = 0;

  const totalMinutes = hour * 60 + minute;
  const minutesSinceStart = totalMinutes - startHour * 60;
  const index = minutesSinceStart / stepMinutes;

  return index;
}
