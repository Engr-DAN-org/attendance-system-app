import { useClassScheduleContext } from "@/components/admin/class-schedule/class-schedule-context";
import WeeklyCalendar from "@/components/admin/sections/components/weekly-calendar";
import { AddScheduleDialog } from "@/components/admin/users/components/add-schedule-dialog";
import { LoadingComponent } from "@/components/general-loader";
import ContentSection from "@/components/general/content-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/admin/users/$userId/class-schedule"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    setScheduleDialogState,
    scheduleForm: form,
    teacherClassScheduleList,
    isFetchPending,
  } = useClassScheduleContext();

  return (
    <ContentSection
      title="Teacher Class Schedule"
      desc="View and manage the teacher's weekly class schedules."
      fullWidth
      headerBtns={
        <>
          <AddScheduleDialog />
        </>
      }
    >
      <div className="w-full">
        {isFetchPending ? (
          <LoadingComponent />
        ) : (
          <WeeklyCalendar
            data={teacherClassScheduleList}
            fullWidth
            onScheduleClick={({ index, event }) => {
              event.index = index;
              form.reset(event);
              setScheduleDialogState("add-schedule");
            }}
          />
        )}
      </div>
    </ContentSection>
  );
}
