import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getSlotIndex } from "@/utils/section.util";
import { slotHeight } from "@/constants/section.constants";
import { ClassSchedule } from "@/interfaces/types/classSchedule";
import { formatTime } from "@/utils/time-format.util";
import { useSectionCreationContext } from "../context/create-section-context";

interface ScheduleEventProps {
  event: ClassSchedule;
  index?: number;
}

export function ScheduleEvent({ event, index }: ScheduleEventProps) {
  const { isBreak, startTime, endTime, subjectCode } = event;
  const { editSchedule } = useSectionCreationContext();

  const startPosition = getSlotIndex(startTime);
  const endPosition = getSlotIndex(endTime);
  const top = Math.round(startPosition * slotHeight);
  const height = Math.round((endPosition - startPosition) * slotHeight);

  return (
    <Card
      onClick={() => {
        if (index !== undefined && !isNaN(index)) editSchedule(index);
      }}
      className={cn(
        "absolute mx-auto z-10 text-center overflow-hidden justify-center flex items-center cursor-pointer",
        isBreak
          ? "bg-muted text-muted-foreground left-0 right-0 rounded-xs"
          : "bg-primary text-primary-foreground left-1 right-1 rounded-md"
      )}
      style={{
        top: `${top}px`,
        height: `${height}px`,
      }}
    >
      <CardContent className={cn("text-md")}>
        {isBreak ? "Lunch Break" : subjectCode}
        <br />
        <span className={cn("text-xs font-medium")}>
          {`${formatTime(startTime)} - ${formatTime(endTime)}`}
        </span>
      </CardContent>
    </Card>
  );
}
