import { slotHeight, timeSlots } from "@/constants/section.constants";
import { ScheduleClickType, ScheduleEvent } from "./schedule-event";
import { ClassSchedule } from "@/interfaces/types/classSchedule";
import { DayOfWeekEntry } from "@/enums/dayOfWeek";

interface DayColumnProps {
  day: DayOfWeekEntry;
  data: ClassSchedule[];
  onScheduleClick?: ScheduleClickType;
}

export default function DayColumn({
  day,
  data,
  onScheduleClick,
}: DayColumnProps) {
  const luncBreak: ClassSchedule = {
    subjectTeacherId: 0,
    day: day.id,
    startTime: "12:00",
    endTime: "13:00",
    // : "Lunch Break",
    gracePeriod: 0,
    isBreak: true,
  };

  return (
    <div className="col-span-1 border-r relative">
      <div className="sticky top-0 bg-secondary text-center font-semibold border-b h-10 flex justify-center items-center">
        {day.name}
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
          .filter((s) => s.day == day.id.toString() || s.dayName == day.name)
          .map((value, key) => {
            return (
              <ScheduleEvent
                key={key}
                index={key}
                event={value}
                onScheduleClick={onScheduleClick}
              />
            );
          })}
      </div>
    </div>
  );
}
