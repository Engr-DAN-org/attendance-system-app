import { slotHeight, timeSlots } from "@/constants/section.constants";
import { ScheduleEvent } from "./schedule-event";
import { ClassSchedule } from "@/interfaces/types/classSchedule";
import { DayOfWeek } from "@/enums/dayOfWeek";

interface DayColumnProps {
  day: DayOfWeek;
  data: ClassSchedule[];
}

export default function DayColumn({ day, data }: DayColumnProps) {
  const luncBreak: ClassSchedule = {
    subjectId: 0,
    day: day,
    startTime: "12:00 PM",
    endTime: "1:00 PM",
    // : "Lunch Break",
    gracePeriod: 0,
    isBreak: true,
  };

  return (
    <div className="col-span-1 border-r relative">
      <div className="sticky top-0 bg-secondary text-center font-semibold border-b h-10 flex justify-center items-center">
        {day}
      </div>
      <div className="flex flex-col !relative">
        {timeSlots.map((_, i) => (
          <div
            key={i}
            className={`${i % 4 == 0 && "border-t"}`}
            style={{ height: `${slotHeight}px` }}
          ></div>
        ))}
        <ScheduleEvent event={luncBreak} />
        {data
          .filter((s) => s.day == day)
          .map((value, key) => {
            return <ScheduleEvent key={key} event={value} />;
          })}
      </div>
    </div>
  );
}
