import { useClassScheduleContext } from "@/components/admin/class-schedule/class-schedule-context";
import { Main } from "@/components/layout/main";
import StartSessionButton from "@/components/teacher/components/start-session";
import StudentsTable from "@/components/teacher/components/students-table";
import NotFoundError from "@/features/errors/not-found-error";
import { getClassScheduleByIdAsync } from "@/services/teacher.service";
import { Separator } from "@radix-ui/react-select";
import { createFileRoute, ErrorComponent } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_authenticated/teacher/class-schedule/$scheduleId"
)({
  params: {
    parse: (params) => {
      const scheduleId = Number(params.scheduleId);
      if (isNaN(scheduleId) || scheduleId <= 0) {
        throw new Error("Invalid scheduleId parameter");
      }
      return { scheduleId };
    },
  },
  loader: async ({ params }) => {
    const scheduleId = params.scheduleId;

    // Perform any necessary data fetching here
    // For example, you might want to fetch the schedule data based on the ID
    return await getClassScheduleByIdAsync(scheduleId);
  },
  errorComponent: ErrorComponent,
  component: RouteComponent,
  notFoundComponent: NotFoundError,
});

function RouteComponent() {
  const scheduleData = Route.useLoaderData();
  const { sectionData, isFetchingSectionData, setSectionId, sectionId } =
    useClassScheduleContext();

  useEffect(() => {
    if (sectionId != scheduleData.sectionId) {
      setSectionId(scheduleData.sectionId as number);
      console.log(
        "useEffect triggered: [sectionId, scheduleData.sectionId]:",
        sectionId,
        scheduleData.sectionId
      );
    }
  }, [scheduleData.sectionId, sectionId, setSectionId]);

  return (
    <Main>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {scheduleData.subjectCode}
          </h2>
          <p className="text-muted-foreground">
            You may view and manage your class schedule here.
            <br />
            Start Time: {scheduleData.startTime}
            <br />
            End Time: {scheduleData.endTime}
          </p>
        </div>
        <StartSessionButton />
      </div>
      <Separator />
      <StudentsTable
        data={sectionData?.students}
        isLoading={isFetchingSectionData}
      />
    </Main>
  );
}
