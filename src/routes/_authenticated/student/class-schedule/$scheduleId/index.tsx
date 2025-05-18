import { useClassScheduleContext } from "@/components/admin/class-schedule/class-schedule-context";
import { LoadingComponent } from "@/components/general-loader";
import { Main } from "@/components/layout/main";
import { AttendanceRecordsTable } from "@/components/student/attendance-record/attendance-record-table";
import StudentScheduleHeader from "@/components/student/class-schedule/class-schedule-header";
import { useStudentContext } from "@/components/student/context/student.context";
import { Separator } from "@/components/ui/separator";
import { AttendanceStatus } from "@/enums/attendanceStatus";
import GeneralError from "@/features/errors/general-error";
import NotFoundError from "@/features/errors/not-found-error";
import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import { useAuthStore } from "@/store/authStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_authenticated/student/class-schedule/$scheduleId/"
)({
  component: RouteComponent,
  pendingComponent: LoadingComponent,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
});

function RouteComponent() {
  const { scheduleId } = Route.useParams();
  const { user: student } = useAuthStore((state) => state);

  const { setQuery, attendanceRecords, isPending, refetchRecords } =
    useStudentContext();

  const { sectionData, setSectionId, sectionId } = useClassScheduleContext();

  useEffect(() => {
    if (!student) return;
    console.log("student", student);

    if (sectionId != student.sectionId) setSectionId(student.sectionId);
    setQuery({
      classScheduleId: Number(scheduleId),
      studentIdNumber: student.idNumber,
    });
    refetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleId, student]);

  const classSchedule = sectionData?.classSchedules?.find(
    (schedule) => schedule.id == Number(scheduleId)
  );

  return (
    <Main>
      <StudentScheduleHeader
        records={attendanceRecords}
        scheduleData={classSchedule}
      />
      <Separator />
      <div className="my-2 flex flex-wrap items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Past Attendance</h2>
          <p className="text-muted-foreground">
            You can check your past attendance records here.
          </p>
        </div>
      </div>
      <AttendanceRecordsTable
        data={attendanceRecords?.filter(
          (record) => record.status != AttendanceStatus.Unmarked
        )}
        isLoading={isPending}
        onRowClick={(row: AttendanceRecord) => {
          console.log(row);
        }}
      />
    </Main>
  );
}
