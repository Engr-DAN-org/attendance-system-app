import React from "react";
import { BadgeCheck, Clock, Info } from "lucide-react";
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

interface ActiveSessionProps {
  section?: Section;
  activeSession?: ClassSession;
  classSchedule: ClassSchedule;
  refetchFn: () => void;
}

const LeftBlock: React.FC<{
  section?: Section;
  classSchedule: ClassSchedule;
}> = ({ section, classSchedule }) => (
  <div className="space-y-2">
    <CardHeader>
      <CardTitle className="text-xl">Class Information</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
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
      <CardContent className="space-y-2 text-sm text-muted-foreground">
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

        {/* Optional: Placeholder for actions or metadata */}
        {/* <div className="pt-2">
            <Button variant="ghost" size="sm">Join</Button>
          </div> */}
      </CardContent>
    </Card>
  );
};

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
