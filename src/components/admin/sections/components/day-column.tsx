import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Schedule {
  title: string;
  day: string;
  start: string;
  end: string;
}

interface DayColumnProps {
  day: string;
  hours: string[];
  schedule: Schedule[];
  getRowIndex: (time: string) => number;
}

export function DayColumn({
  day,
  hours,
  schedule,
  getRowIndex,
}: DayColumnProps) {
  return (
    <div className="col-span-1 border-r relative">
      <div className="sticky top-0 bg-background text-center font-semibold border-b py-2">
        {day}
      </div>
      {hours.map((_, i) => (
        <div key={i} className="h-10 border-b"></div>
      ))}
      {schedule
        .filter((s) => s.day === day)
        .map((s, i) => {
          const start = getRowIndex(s.start);
          const end = getRowIndex(s.end);
          const height = (end - start) * 40;
          return (
            <Card
              key={i}
              className={cn(
                "absolute w-[160px] left-0 right-0 mx-auto z-10",
                "bg-primary text-primary-foreground shadow-md rounded-md px-2 py-1"
              )}
              style={{ top: start * 40, height }}
            >
              <CardContent className="p-2 text-sm font-medium text-center">
                {s.title}
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}
