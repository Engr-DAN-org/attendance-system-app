import { TimeSlot } from "@/components/admin/sections/components/weekly-calendar";
import { formatTime } from "@/utils/date-time-format.util";

const startHour = 6; // 6AM
const endHour = 20; // 8PM
const stepMinutes = 15;

const slotHeight = 15; // in px

const timeSlots: TimeSlot[] = Array.from(
  {
    length: ((endHour - startHour) * 60) / stepMinutes,
  },
  (_, i) => {
    const totalMinutes = startHour * 60 + i * stepMinutes;
    const hour = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const time = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    return {
      label: formatTime(time),
      time,
    };
  }
);

export { endHour, slotHeight, startHour, stepMinutes, timeSlots };
