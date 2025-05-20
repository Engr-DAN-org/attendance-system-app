import { LoadingComponent } from "@/components/general-loader";
import { Main } from "@/components/layout/main";
import { AttendanceRecordsTable } from "@/components/teacher/components/attendance-record-table";
import ClassSessionDialogs from "@/components/teacher/components/class-session-dialogs";
import { ClassSessionPrimaryButtons } from "@/components/teacher/components/class-session-primary-buttons";
import { useClassSessionContext } from "@/components/teacher/context/class-session-context";
import { Badge } from "@/components/ui/badge";
import NotFoundError from "@/features/errors/not-found-error";
import { formatUTCTime } from "@/utils/date-time-format.util";
import { createLazyFileRoute, ErrorComponent } from "@tanstack/react-router";
import { Calendar, CheckCircle2, MapPin } from "lucide-react";
import { useEffect } from "react";

export const Route = createLazyFileRoute(
  "/_authenticated/teacher/class-schedule/$scheduleId/session/$sessionId"
)({
  errorComponent: ErrorComponent,
  component: RouteComponent,
  notFoundComponent: NotFoundError,
  pendingComponent: LoadingComponent,
});

function RouteComponent() {
  const { sessionId } = Route.useParams();
  const { setClassSessionId, classSession } = useClassSessionContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setClassSessionId(sessionId), [sessionId]);

  return (
    <>
      <Main>
        <div className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Class Session Attendance
              </h2>
              <p className="text-muted-foreground">
                View and manage student attendance records.
              </p>

              {/* Session Details Section */}
              {classSession && (
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {classSession.isRemote
                        ? "Remote"
                        : classSession.location || "No location specified"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {formatUTCTime(classSession?.startTime as string)}
                      {classSession.endTime && (
                        <>
                          {" - "}
                          {formatUTCTime(classSession.endTime)}
                        </>
                      )}
                    </span>
                  </div>

                  {classSession.endTime && (
                    <Badge
                      variant="outline"
                      className="border-green-200 text-green-800"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Session Completed
                    </Badge>
                  )}
                </div>
              )}
            </div>

            <ClassSessionPrimaryButtons classSession={classSession} />
          </div>
        </div>

        <AttendanceRecordsTable
          classSession={classSession!}
          data={classSession?.attendanceRecords}
        />
      </Main>
      <ClassSessionDialogs />
    </>
  );
}
