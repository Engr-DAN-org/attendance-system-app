import WeeklyCalendar from "@/components/admin/sections/components/weekly-calendar";
import { LoadingComponent } from "@/components/general-loader";
import { Main } from "@/components/layout/main";
import { useTeacherContext } from "@/components/teacher/context/teacher.context";
import { Separator } from "@/components/ui/separator";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createLazyFileRoute(
  "/_authenticated/teacher/class-schedule/"
)({
  pendingComponent: LoadingComponent,
  component: RouteComponent,
});

function RouteComponent() {
  const { teacherSchedules, authTeacher, refechSchedules } =
    useTeacherContext();
  const { navigate } = useRouter();
  useEffect(() => {
    async function fetchSchedules() {
      await refechSchedules();
      console.log("scgedyles:", teacherSchedules, authTeacher);
    }
    fetchSchedules();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Main>
        <div className="overflow-auto">
          <div className="flex justify-between items-center">
            <div className="mb-2">
              <h1 className="text-2xl font-bold tracking-tight">
                Class Schedule
              </h1>
              <p className="text-muted-foreground">
                This is your class schedule. You can view and manage your
                classes here.
              </p>
            </div>
            {/* <Button type="submit" form="section-form">
              <IconDatabase /> Save Section
            </Button> */}
          </div>
          <Separator />
        </div>
        <WeeklyCalendar
          data={teacherSchedules}
          withSafeClickMethod={true}
          onScheduleClick={({ event }) =>
            navigate({
              to: "/teacher/class-schedule/$scheduleId",
              params: { scheduleId: event.id },
            })
          }
        />
      </Main>
    </>
  );
}
