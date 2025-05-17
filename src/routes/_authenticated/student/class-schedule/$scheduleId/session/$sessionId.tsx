import { LoadingComponent } from "@/components/general-loader";
import { Main } from "@/components/layout/main";
import AttendanceRecordCard from "@/components/student/attendance-record/attendance-record-card";
import GeneralError from "@/features/errors/general-error";
import NotFoundError from "@/features/errors/not-found-error";
import { getRecordBySessionId } from "@/services/attendance-record.service";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/student/class-schedule/$scheduleId/session/$sessionId"
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { sessionId } = params;
    return await getRecordBySessionId(sessionId);
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
  pendingComponent: LoadingComponent,
});

function RouteComponent() {
  const attendanceRecord = Route.useLoaderData();
  return (
    <Main>
      <AttendanceRecordCard record={attendanceRecord} />
    </Main>
  );
}
