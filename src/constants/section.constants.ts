import { TimeSlot } from "@/components/admin/sections/components/weekly-calendar";

const startHour = 6; // 6AM
const endHour = 20; // 8PM
const stepMinutes = 15;

const slotHeight = 7; // in px

const timeSlots: TimeSlot[] = Array.from(
  {
    length: ((endHour - startHour) * 60) / stepMinutes,
  },
  (_, i) => {
    const totalMinutes = startHour * 60 + i * stepMinutes;
    const hour = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return {
      label:
        minutes === 0
          ? `${hour % 12 || 12}${hour < 12 ? ":00 AM" : ":00 PM"}`
          : "",
      time: `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
    };
  }
);

export { endHour, slotHeight, startHour, stepMinutes, timeSlots };
