import { LoadingComponent } from "@/components/general-loader";
import { Main } from "@/components/layout/main";
import { AttendanceRecordsTable } from "@/components/teacher/components/attendance-record-table";
import ClassSessionDialogs from "@/components/teacher/components/class-session-dialogs";
import { ClassSessionPrimaryButtons } from "@/components/teacher/components/class-session-primary-buttons";
import { useClassSessionContext } from "@/components/teacher/context/class-session-context";
import NotFoundError from "@/features/errors/not-found-error";
import { createLazyFileRoute, ErrorComponent } from "@tanstack/react-router";
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
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Class Session Attendance
            </h2>
            <p className="text-muted-foreground">
              View and manage student attendance records.
            </p>
          </div>
          <ClassSessionPrimaryButtons classSession={classSession} />
        </div>
        <AttendanceRecordsTable data={classSession?.attendanceRecords} />
      </Main>
      <ClassSessionDialogs />
    </>
  );
}
