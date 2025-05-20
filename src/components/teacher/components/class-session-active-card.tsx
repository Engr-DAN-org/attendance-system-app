import React from "react";
import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  Clock4,
  HelpCircle,
  Info,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClassSession } from "@/interfaces/types/classSession";
import { ClassSchedule } from "@/interfaces/types/classSchedule";
import { Section } from "@/interfaces/types/section";
import {
  formatTime,
  formatUTCTime,
  getDurationInMinutes,
} from "@/utils/date-time-format.util";
import { useRouter } from "@tanstack/react-router";
import StartSessionButton from "./dialog-class-session-start";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import { AttendanceStatus } from "@/enums/attendanceStatus";

const LeftBlock: React.FC<{
  section?: Section;
  classSchedule: ClassSchedule;
}> = ({ section, classSchedule }) => (
  <div className="space-y-2">
    <CardHeader>
      <CardTitle className="text-xl md:text-3xl">Class Information</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-2 md:gap-4 md:text-xl py-4">
      <p>
        <span className="font-medium text-foreground">Subject:</span>{" "}
        {classSchedule?.subjectCode} - {classSchedule?.subjectName}
      </p>
      <p>
        <span className="font-medium text-foreground">Course Section:</span>{" "}
        {`${section?.course?.code} ${section?.yearLevel} - ${section?.name}`}
      </p>
      <p>
        <span className="font-medium text-foreground">Schedule:</span>{" "}
        {`${formatTime(classSchedule.startTime)} ~ ${formatTime(classSchedule.endTime)}`}
      </p>
    </CardContent>
  </div>
);

const RightBlock: React.FC<{
  activeSession?: ClassSession;
  classSchedule: ClassSchedule;
  refetchFn: () => void;
}> = ({ activeSession, classSchedule, refetchFn }) => {
  const { navigate } = useRouter();

  const studentRecords: AttendanceRecord[] =
    activeSession?.attendanceRecords ?? [];

  // Mock data - replace with your actual attendance data
  const attendanceSummary = {
    totalStudents: studentRecords.length,
    present: studentRecords.filter((r) => r.status == AttendanceStatus.Present)
      .length,
    late: studentRecords.filter((r) => r.status == AttendanceStatus.Late)
      .length,
    absent: studentRecords.filter((r) => r.status == AttendanceStatus.Absent)
      .length,
    unmarked: studentRecords.filter(
      (r) => r.status == AttendanceStatus.Unmarked
    ).length,
  };

  if (!activeSession) {
    return (
      <Card className="bg-muted/50 border-dashed shadow-none">
        <CardContent className="py-6 flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center text-muted-foreground text-sm gap-2">
            <Info className="h-4 w-4 text-blue-500" />
            <span>No ongoing class session found for this schedule.</span>
          </div>
          <StartSessionButton
            scheduleId={classSchedule.id}
            refetchFn={refetchFn}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="border-green-500 border shadow-sm cursor-pointer hover:bg-muted transition-colors"
      onClick={() => {
        navigate({
          to: "/teacher/class-schedule/$scheduleId/session/$sessionId",
          params: {
            scheduleId: activeSession.classScheduleId.toString(),
            sessionId: activeSession.id,
          },
        });
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Active Class Session</CardTitle>
          <Badge
            variant="outline"
            className="text-green-700 border-green-300 bg-green-50 inline-flex items-center gap-1"
          >
            <BadgeCheck className="h-4 w-4" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">Location:</span>{" "}
          <span>
            {activeSession.isRemote ? "Remote" : activeSession.location}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground flex items-center gap-2">
            Started <Clock className="h-4 w-4" />
          </span>{" "}
          <span>
            {formatUTCTime(activeSession.startTime!)} ·{" "}
            {getDurationInMinutes(
              activeSession.startTime!,
              activeSession.endTime
            )}
            {" ago"}
          </span>
        </div>

        {/* Attendance Summary Section */}
        <div className="pt-2 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium text-foreground">
              Attendance Summary
            </span>
            <span className="text-xs text-muted-foreground">
              {attendanceSummary.totalStudents} students
            </span>
          </div>

          {/* Correct Progress Bars Implementation */}
          <div className="space-y-2">
            {[
              {
                status: "Present",
                value: attendanceSummary.present,
                bgColor: "bg-green-500",
                textColor: "text-green-500",
                icon: CheckCircle2,
              },
              {
                status: "Late",
                value: attendanceSummary.late,
                bgColor: "bg-yellow-500",
                textColor: "text-yellow-500",
                icon: Clock4,
              },
              {
                status: "Absent",
                value: attendanceSummary.absent,
                bgColor: "bg-red-500",
                textColor: "text-red-500",
                icon: XCircle,
              },
              {
                status: "Unmarked",
                value: attendanceSummary.unmarked,
                bgColor: "bg-gray-400",
                textColor: "text-gray-400",
                icon: HelpCircle,
              },
            ].map((item) => (
              <TooltipProvider key={item.status}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 group">
                      <div className={`w-2 h-2 rounded-full ${item.bgColor}`} />
                      <span className="text-xs w-14">{item.status}</span>
                      <div className="flex-1 relative">
                        <Progress
                          value={
                            (item.value / attendanceSummary.totalStudents) * 100
                          }
                          className="h-2"
                        />
                        <div
                          className={`absolute inset-y-0 left-0 h-full rounded-full ${item.bgColor}`}
                          style={{
                            width: `${(item.value / attendanceSummary.totalStudents) * 100}%`,
                          }}
                        />
                      </div>
                      <span
                        className={`text-xs w-8 text-right font-medium ${item.textColor}`}
                      >
                        {item.value}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    {Math.round(
                      (item.value / attendanceSummary.totalStudents) * 100
                    )}
                    % {item.status.toLowerCase()}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ActiveSessionProps {
  section?: Section;
  activeSession?: ClassSession;
  classSchedule: ClassSchedule;
  refetchFn: () => void;
}

const ActiveSessionCard: React.FC<ActiveSessionProps> = ({
  section,
  activeSession,
  classSchedule,
  refetchFn,
}) => {
  return (
    <Card className="shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-6 text-sm text-muted-foreground">
        <LeftBlock section={section} classSchedule={classSchedule} />
        <RightBlock
          activeSession={activeSession}
          refetchFn={refetchFn}
          classSchedule={classSchedule}
        />
      </div>
    </Card>
  );
};

export default ActiveSessionCard;
