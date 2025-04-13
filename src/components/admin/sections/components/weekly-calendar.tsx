import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DayOfWeekMap } from "@/enums/dayOfWeek";
import { cn } from "@/lib/utils";

const startHour = 6; // 6AM
const endHour = 20; // 8PM
const stepMinutes = 15;

const slotHeight = 10; // in px

const timeSlots = Array.from(
  {
    length: ((endHour - startHour) * 60) / stepMinutes,
  },
  (_, i) => {
    const totalMinutes = startHour * 60 + i * stepMinutes;
    const hour = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return {
      label:
        minutes === 0 ? `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}` : "",
      time: `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
    };
  }
);

type Event = {
  day: string;
  start: string;
  end: string;
  title: string;
  isBreak?: boolean;
};

const sampleSchedule: Event[] = [
  {
    day: "Monday",
    start: "8:00 AM",
    end: "9:15 AM",
    title: "Math 101",
  },
  {
    day: "Wednesday",
    start: "6:30 PM",
    end: "8:00 PM",
    title: "Physics",
  },
  {
    day: "Friday",
    start: "10:00 AM",
    end: "11:30 AM",
    title: "English",
  },
];

function getSlotIndex(time: string) {
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

function ScheduleEvent({ event }: { event: (typeof sampleSchedule)[number] }) {
  const { isBreak, title, start, end } = event;

  const startPosition = getSlotIndex(start);
  const endPosition = getSlotIndex(end);
  const top = Math.round(startPosition * slotHeight);
  const height = Math.round((endPosition - startPosition) * slotHeight);

  return (
    <Card
      className={cn(
        "absolute mx-auto z-10 text-center px-2 text-xs overflow-hidden",
        isBreak
          ? "bg-muted text-muted-foreground flex justify-center items-center left-0 right-0 rounded-xs"
          : "bg-primary text-primary-foreground left-1 right-1"
      )}
      style={{ top, height }}
    >
      <CardContent className={cn("p-1 text-xs font-medium")}>
        {title}
      </CardContent>
    </Card>
  );
}

function TimeColumn() {
  return (
    <div className="col-span-1 border-r bg-muted  font-medium text-center sticky left-0 z-10">
      <div className="sticky top-0 bg-background text-center font-semibold border-b h-10">
        {/* Schedule */}
      </div>
      {timeSlots.map(
        ({ label }, i) =>
          i % 4 === 0 && (
            <div
              key={i}
              className="h-10 flex items-center justify-center border-b text-sm"
            >
              {label}
            </div>
          )
      )}
    </div>
  );
}

function DayColumn({ day }: { day: string }) {
  const luncBreak: Event | null = {
    day: day,
    start: "12:00 PM",
    end: "1:00 PM",
    title: "Lunch Break",
    isBreak: true,
  };

  return (
    <div className="col-span-1 border-r relative">
      <div className="sticky top-0 bg-background text-center font-semibold border-b h-10 flex justify-center items-center">
        {day}
      </div>
      <div className="flex flex-col relative">
        {timeSlots.map((_, i) => (
          <div
            key={i}
            className={`${i % 4 == 0 && "border-t"}`}
            style={{ height: slotHeight }}
          ></div>
        ))}
        {luncBreak != null && <ScheduleEvent event={luncBreak} />}
        {sampleSchedule
          .filter((s) => s.day === day)
          .map((value, key) => {
            return <ScheduleEvent key={key} event={value} />;
          })}
      </div>
    </div>
  );
}

export default function WeeklyCalendar() {
  return (
    <ScrollArea className="w-full overflow-auto border-collapse">
      <div className="grid grid-cols-8 min-w-[1000px]">
        <TimeColumn />
        {Object.values(DayOfWeekMap).map(({ id, name }) => (
          <DayColumn key={id} day={name} />
        ))}
      </div>
    </ScrollArea>
  );
}
