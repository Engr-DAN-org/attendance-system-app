import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DayOfWeekMap } from "@/enums/dayOfWeek";
import TimeColumn from "./time-column";
import DayColumn from "./day-column";
import { ClassSchedule } from "@/interfaces/types/classSchedule";
import { ScheduleClickType } from "./schedule-event";
import { cn } from "@/lib/utils";

// export interface Event {
//   day: string;
//   start: string;
//   end: string;
//   title: string;
//   isBreak?: boolean;
// }

export interface TimeSlot {
  label: string;
  time: string;
}

// const sampleSchedule: Event[] = [
//   {
//     day: "Monday",
//     start: "8:00 AM",
//     end: "9:15 AM",
//     title: "Math 101",
//   },
//   {
//     day: "Wednesday",
//     start: "6:30 PM",
//     end: "8:00 PM",
//     title: "Physics",
//   },
//   {
//     day: "Friday",
//     start: "10:00 AM",
//     end: "11:30 AM",
//     title: "English",
//   },
// ];

interface WeeklyCalendarProps {
  data?: ClassSchedule[];
  onScheduleClick?: ScheduleClickType;
  onClickCloseEvent?: (event: ClassSchedule) => void;
  fullWidth?: boolean;
  viewOnly?: boolean;
  withSafeClickMethod?: boolean;
}

export default function WeeklyCalendar({
  onClickCloseEvent,
  viewOnly = true,
  withSafeClickMethod = false,
  data,
  onScheduleClick,
  fullWidth = false,
}: WeeklyCalendarProps) {
  console.log("WeeklyCalendar data", data);

  return (
    <div className="flex flex-row border-collapse relative rounded-md border overflow-hidden">
      <div className="w-20 sticky left-0 z-10 bg-background border-r">
        <TimeColumn />
      </div>
      <ScrollArea className="flex-1 overflow-x-auto">
        <div
          className={cn(
            "grid grid-cols-7 whitespace-nowrap w-full",
            fullWidth ? "w-full min-w-[850px]" : "min-w-[1000px]"
          )}
        >
          {Object.values(DayOfWeekMap).map((day) => {
            const filteredData = data?.filter((item) => item.day == day.id);
            return (
              <DayColumn
                onClickCloseEvent={onClickCloseEvent}
                key={day.id}
                day={day}
                data={filteredData}
                onScheduleClick={({ event, index }) => {
                  if (viewOnly && !withSafeClickMethod) return;
                  onScheduleClick?.({ event, index });
                }}
              />
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
