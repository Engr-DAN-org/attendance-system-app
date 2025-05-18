import { LoadingComponent } from "@/components/general-loader";
import { Main } from "@/components/layout/main";
import AttendanceRecordCard from "@/components/student/attendance-record/attendance-record-card";
import GeneralError from "@/features/errors/general-error";
import NotFoundError from "@/features/errors/not-found-error";
import { getRecordBySessionId } from "@/services/attendance-record.service";
import { getByIdAsync } from "@/services/class-schedule.service";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/student/class-schedule/$scheduleId/session/$sessionId"
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { sessionId, scheduleId } = params;
    const attendanceRecord = await getRecordBySessionId(sessionId);
    if (
      attendanceRecord.classScheduleId &&
      attendanceRecord.classScheduleId != Number(scheduleId)
    ) {
      throw new Error("Class schedule ID does not match");
    }
    const classSchedule = await getByIdAsync(Number(scheduleId));

    return {
      attendanceRecord,
      classSchedule,
    };
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
  pendingComponent: LoadingComponent,
});

function RouteComponent() {
  const { attendanceRecord, classSchedule } = Route.useLoaderData();
  return (
    <Main>
      <AttendanceRecordCard
        record={attendanceRecord}
        classSchedule={classSchedule}
      />
    </Main>
  );
}
