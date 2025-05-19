import React, { useEffect } from "react";
import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ClassSchedule } from "@/interfaces/types/classSchedule";
import { formatTime } from "@/utils/date-time-format.util";
import { AttendanceStatus } from "@/enums/attendanceStatus";
import { OngoinScheduleBox } from "./ongoing-schedule-box";
import { ClassSessionStatus } from "@/enums/classSessionStatus";

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

const StudentScheduleHeader: React.FC<StudentAttendanceCardProps> = ({
  records,
  scheduleData,
}) => {
  const ongoingRecord = records?.find(
    (rec) => !rec.clockInRecord || rec.status == AttendanceStatus.Unmarked
  );
  useEffect(() => {
    if (ongoingRecord) {
      console.log("Ongoing Record:", ongoingRecord);
    }
  }, [ongoingRecord]);

  const classIsOngoing =
    scheduleData?.classSessions?.some(
      (session) => session.status == ClassSessionStatus.Started
    ) || false;

  return (
    <Card className="shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 lg:pr-6 lg:pl-0 text-sm text-muted-foreground">
        <LeftBlock scheduleData={scheduleData} />
        <OngoinScheduleBox
          classIsOngoing={classIsOngoing}
          unmarkedRecord={ongoingRecord}
          className="mx-4 lg:mx-0"
        />
      </div>
    </Card>
  );
};

export default StudentScheduleHeader;
