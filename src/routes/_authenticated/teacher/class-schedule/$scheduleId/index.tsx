import { useClassScheduleContext } from "@/components/admin/class-schedule/class-schedule-context";
import { Main } from "@/components/layout/main";
import ActiveSessionCard from "@/components/teacher/components/class-session-active-card";
import ClassSessionsTable from "@/components/teacher/components/class-sessions-table";
import { ClassSessionStatus } from "@/enums/classSessionStatus";
import NotFoundError from "@/features/errors/not-found-error";
import { getListByScheduleIdAsync } from "@/services/class-session.service";
import { getClassScheduleByIdAsync } from "@/services/teacher.service";
import { Separator } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, ErrorComponent } from "@tanstack/react-router";
import { useEffect } from "react";
export const Route = createFileRoute(
  "/_authenticated/teacher/class-schedule/$scheduleId/"
)({
  params: {
    parse: (rawParams: Record<string, string>) => {
      const scheduleId = Number(rawParams.scheduleId);
      if (isNaN(scheduleId) || scheduleId <= 0) {
        throw new Error("Invalid scheduleId parameter");
      }
      return { scheduleId };
    },
  },

  loader: async ({ params }) => {
    const scheduleId = params.scheduleId;

    return await getClassScheduleByIdAsync(scheduleId);
  },
  errorComponent: ErrorComponent,
  component: RouteComponent,
  notFoundComponent: NotFoundError,
});

function RouteComponent() {
  const scheduleData = Route.useLoaderData();
  const { sectionData, sectionId, setSectionId } = useClassScheduleContext();

  useEffect(() => {
    console.log("scheduled data:", scheduleData);

    if (sectionId != scheduleData.sectionId) {
      setSectionId(scheduleData.sectionId as number);
      console.log(
        "useEffect triggered: [sectionId, scheduleData.sectionId]:",
        sectionId,
        scheduleData.sectionId
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleData.sectionId, sectionId, setSectionId]);

  const {
    data: classSessions,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["classSessions", scheduleData.id],
    queryFn: async () => await getListByScheduleIdAsync(scheduleData.id),
    enabled: !!scheduleData.id,
  });

  return (
    <Main>
      <ActiveSessionCard
        section={sectionData}
        classSchedule={scheduleData}
        refetchFn={refetch}
        activeSession={classSessions?.find(
          (session) => session.status == ClassSessionStatus.Started
        )}
      />
      <Separator />
      <ClassSessionsTable
        data={classSessions?.filter(
          (cs) => cs.status != ClassSessionStatus.Started
        )}
        isLoading={isPending}
      />
    </Main>
  );
}
