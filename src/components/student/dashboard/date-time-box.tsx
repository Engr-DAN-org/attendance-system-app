import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { CalendarClockIcon, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const DateTimeBox = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 2000); // Update every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <Card className="shadow-lg border-0 bg-secondary backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl md:text-3xl text-secondary-foreground flex flex-row justify-between items-center gap-3">
          <div className="space-y-1 flex flex-row justify-between items-center w-full">
            <div className="font-semibold flex flex-row items-center gap-2">
              <Clock className="size-6 lg:size-8" />
              {format(currentTime, "h:mm a")}
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2 ml-4">
              <CalendarClockIcon className="size-4 lg:size-6" />
              <span> {format(currentTime, "PPP")}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">
          Today&apos;s Time and Date
        </p>
      </CardContent>
    </Card>
  );
};

export default DateTimeBox;
