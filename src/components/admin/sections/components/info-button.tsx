import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

export function ClassScheduleInfoButton({
  hasError = false,
}: {
  hasError?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            " p-0",
            hasError ? "text-destructive" : "text-muted-foreground"
          )}
        >
          <Info className="h-4 w-4" />
          <span className="sr-only">Class Schedule Info</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" text-xs space-y-2 bg-accent" side="right">
        <ul className="list-disc pl-4 space-y-1">
          <li>Time should be between 6:00AM and 7:00PM.</li>
          <li>Schedules should not overlap, including lunch breaks.</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
