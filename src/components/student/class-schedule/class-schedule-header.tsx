import React from "react";
import { BadgeCheck, QrCode, Info } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClassSchedule } from "@/interfaces/types/classSchedule";
import { formatTime } from "@/utils/date-time-format.util";
import { AttendanceStatus } from "@/enums/attendanceStatus";
import { ClassSessionStatus } from "@/enums/classSessionStatus";
import { cn } from "@/lib/utils";

interface StudentAttendanceCardProps {
  records?: AttendanceRecord[];
  scheduleData?: ClassSchedule;
}

const LeftBlock: React.FC<{ scheduleData?: ClassSchedule }> = ({
  scheduleData,
}) => (
  <div className="space-y-2">
    <CardHeader>
      <CardTitle className="text-xl">Class Information</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
      <p>
        <span className="font-medium text-foreground">Subject:</span>{" "}
        {scheduleData?.subjectCode} - {scheduleData?.subjectName}
      </p>
      <p>
        <span className="font-medium text-foreground">Schedule:</span>{" "}
        {scheduleData?.startTime && scheduleData?.endTime
          ? `${formatTime(scheduleData.startTime)} ~ ${formatTime(scheduleData.endTime)}`
          : "N/A"}
      </p>
    </CardContent>
  </div>
);

interface RightBlockProps {
  ongoingRecord?: AttendanceRecord;
  scheduleData?: ClassSchedule;
}
const RightBlock: React.FC<RightBlockProps> = ({
  ongoingRecord,
  scheduleData,
}) => {
  const { navigate } = useRouter();

  const classIsOngoing = scheduleData?.classSessions?.find(
    (session) => session.status == ClassSessionStatus.Started
  );

  const showPending = !!ongoingRecord;
  const showOngoingButAllSet = !showPending && classIsOngoing;

  const cardClass = cn(
    "shadow-sm transition-colors",
    showPending && "border-yellow-500 border cursor-pointer hover:bg-muted",
    showOngoingButAllSet && "border-green-500 border bg-muted/50",
    !showPending &&
      !showOngoingButAllSet &&
      "bg-muted/50 border-dashed shadow-none"
  );

  return (
    <Card className={cn(cardClass, "mx-4 lg:mx-0 gap-1")}>
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
            {showPending ? (
              <QrCode />
            ) : showOngoingButAllSet ? (
              <BadgeCheck />
            ) : (
              <Info className=" text-blue-500" />
            )}
            {showPending ? "Pending" : showOngoingButAllSet ? "All Set" : "N/A"}
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
          <p>You're already marked present. Enjoy your class!</p>
        ) : (
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-blue-500" />
            <span>You have no pending attendance. You're all set!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
const StudentScheduleHeader: React.FC<StudentAttendanceCardProps> = ({
  records,
  scheduleData,
}) => {
  const ongoingRecord = records?.find(
    (rec) => !rec.clockInRecord || rec.status === AttendanceStatus.Unmarked
  );

  return (
    <Card className="shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 lg:pr-6 lg:pl-0 text-sm text-muted-foreground">
        <LeftBlock scheduleData={scheduleData} />
        <RightBlock ongoingRecord={ongoingRecord} />
      </div>
    </Card>
  );
};

export default StudentScheduleHeader;
