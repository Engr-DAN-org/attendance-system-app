import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getSlotIndex } from "@/utils/section.util";
import { slotHeight } from "@/constants/section.constants";
import { ClassSchedule } from "@/interfaces/types/classSchedule";

interface ScheduleEventProps {
  event: ClassSchedule;
}

export function ScheduleEvent({ event }: ScheduleEventProps) {
  const { isBreak, startTime, endTime, subjectName } = event;

  const startPosition = getSlotIndex(startTime);
  const endPosition = getSlotIndex(endTime);
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
        {isBreak ? "Lunch Break" : subjectName}
      </CardContent>
    </Card>
  );
}
