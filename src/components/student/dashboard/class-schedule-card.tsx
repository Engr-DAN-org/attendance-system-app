import { ClassSessionStatus } from "@/enums/classSessionStatus";
import { ClassSchedule } from "@/interfaces/types/classSchedule";
import { ClassSession } from "@/interfaces/types/classSession";
import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/date-time-format.util";
import { CheckCircle, Clock, ListChecks, XCircle } from "lucide-react";

const ClassScheduleCard = ({
  classSchedule,
  className,
  onClick,
}: {
  classSchedule: ClassSchedule;
  className?: string | undefined;
  onClick: () => void;
}) => {
  const todaySession = classSchedule.classSessions?.find((session) => {
    const sessionDate = new Date(session.createdAt);
    const today = new Date();
    return (
      sessionDate.getFullYear() === today.getFullYear() &&
      sessionDate.getMonth() === today.getMonth() &&
      sessionDate.getDate() === today.getDate()
    );
  });

  const getClassStatus = (todaySession?: ClassSession) => {
    switch (todaySession?.status) {
      case ClassSessionStatus.Started:
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case ClassSessionStatus.Ended:
        return <Clock className="text-yellow-500 w-5 h-5" />;
      case ClassSessionStatus.Canceled:
        return <XCircle className="text-red-500 w-5 h-5" />;
      default:
        return <ListChecks className="text-gray-500 w-5 h-5" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 rounded-lg flex items-center justify-between",
        "bg-white dark:bg-gray-900",
        "border border-gray-200 dark:border-gray-800",
        "shadow-md",
        className
      )}
    >
      <div className="space-y-1">
        <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
          {classSchedule.subjectName} ({classSchedule.subjectCode})
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {formatTime(classSchedule.startTime)} -{" "}
          {formatTime(classSchedule.endTime)}
        </div>
        {/* <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
          <UserSquare />
          {classSchedule.teacherName}
        </div> */}
        <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
          {getClassStatus(todaySession)}
          {todaySession?.status || "Not Started"}
        </div>
      </div>
    </div>
  );
};

export default ClassScheduleCard;
