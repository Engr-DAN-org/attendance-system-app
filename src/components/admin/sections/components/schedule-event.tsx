import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getSlotIndex } from "@/utils/section.util";
import { slotHeight } from "@/constants/section.constants";
import { ClassSchedule } from "@/interfaces/types/classSchedule";
import { formatTime } from "@/utils/time-format.util";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ScheduleClickType = ({
  index,
  event,
}: {
  index?: number;
  event: ClassSchedule;
}) => void;

interface ScheduleEventProps {
  onClickClose?: (event: ClassSchedule) => void;
  event: ClassSchedule;
  index?: number;
  onScheduleClick?: ScheduleClickType;
}

export function ScheduleEvent({
  onClickClose,
  event,
  index,
  onScheduleClick,
}: ScheduleEventProps) {
  const { isBreak, startTime, endTime, subjectCode } = event;

  const startPosition = getSlotIndex(startTime);
  const endPosition = getSlotIndex(endTime);
  const top = Math.round(startPosition * slotHeight);
  const height = Math.round((endPosition - startPosition) * slotHeight);

  return (
    <div
      className={cn("absolute", isBreak ? "left-0 right-0 " : "left-1 right-1")}
      style={{
        top: `${top}px`,
        height: `${height}px`,
      }}
    >
      <Card
        onClick={() => {
          if (isBreak) return;

          if (onScheduleClick) {
            console.log("Clicked and method set:", event, index);
            onScheduleClick({ event, index });
          } else {
            console.log("Clicked without Method:", event, index);
          }
        }}
        className={cn(
          "relative mx-auto z-10 text-center overflow-hidden justify-center flex items-center cursor-pointer h-full z-0",
          isBreak
            ? "bg-muted text-muted-foreground  rounded-xs"
            : "bg-primary text-primary-foreground  rounded-md"
        )}
      >
        <CardContent className={cn("text-md relative")}>
          {isBreak ? "Lunch Break" : subjectCode}
          <br />
          <span className={cn("text-xs font-medium")}>
            {`${formatTime(startTime)} - ${formatTime(endTime)}`}
          </span>
        </CardContent>
      </Card>
      {onClickClose && !isBreak && (
        <Button
          variant={"ghost"}
          className={cn("absolute right-1 top-1 size-4 z-[1] text-accent")}
          onClick={() => onClickClose(event)}
        >
          <X />
        </Button>
      )}
    </div>
  );
}
