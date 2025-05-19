import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import { cn } from "@/lib/utils";
import { useRouter } from "@tanstack/react-router";
import { BadgeCheck, Info, QrCode } from "lucide-react";

interface OngoinScheduleBoxProps {
  unmarkedRecord?: AttendanceRecord;
  classIsOngoing?: boolean;
  className?: string;
}
export const OngoinScheduleBox: React.FC<OngoinScheduleBoxProps> = ({
  unmarkedRecord,
  classIsOngoing = false,
  className,
}) => {
  const { navigate } = useRouter();

  const showPending = !!unmarkedRecord;
  const showOngoingButAllSet = !showPending && classIsOngoing;

  return (
    <Card
      className={cn(
        "shadow-sm transition-colors gap-1",
        showPending && "border-yellow-500 border cursor-pointer hover:bg-muted",
        showOngoingButAllSet && "border-green-500 border bg-muted/50",
        !showPending &&
          !showOngoingButAllSet &&
          "bg-muted/50 border-dashed shadow-none",
        className
      )}
    >
      <CardHeader className="pb-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {showPending || showOngoingButAllSet
              ? "Ongoing Class"
              : "Attendance Status"}
          </CardTitle>
          <Badge
            variant="outline"
            className={cn("inline-flex items-center gap-1", {
              "text-yellow-700 border-yellow-300 bg-yellow-50": showPending,
              "text-green-700 border-green-300 bg-green-50":
                showOngoingButAllSet,
              "text-muted-foreground": !showPending && !showOngoingButAllSet,
            })}
          >
            {showPending ? <QrCode /> : <BadgeCheck />}
            {showPending
              ? "Pending"
              : showOngoingButAllSet
                ? "Logged"
                : "All Set"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        {showPending ? (
          <>
            <p>
              Please scan the QR code to mark your attendance for this session.
            </p>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate({ to: "/student/qr-scan" })}
            >
              <QrCode className="mr-2 h-4 w-4" />
              Scan QR Code
            </Button>
          </>
        ) : showOngoingButAllSet ? (
          <p>You're already marked for attendance. Enjoy your class!</p>
        ) : (
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-blue-500" />
            <span>No ongoing class session. You're all set!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
