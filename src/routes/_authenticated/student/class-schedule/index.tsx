import { useClassScheduleContext } from "@/components/admin/class-schedule/class-schedule-context";
import WeeklyCalendar from "@/components/admin/sections/components/weekly-calendar";
import { Main } from "@/components/layout/main";
import { useAuthStore } from "@/store/authStore";
import { Separator } from "@radix-ui/react-select";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/student/class-schedule/")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  const { user } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const { sectionData, setSectionId } = useClassScheduleContext();

  useEffect(() => {
    setSectionId(user?.sectionId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Main>
      <div className="overflow-auto">
        <div className="flex justify-between items-center">
          <div className="mb-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Class Information
            </h1>
            <p className="text-muted-foreground">
              This is your class schedule. You can view and manage your classes
              here.
            </p>
          </div>
          {/* <Button type="submit" form="section-form">
        <IconDatabase /> Save Section
      </Button> */}
        </div>
        <Separator />
      </div>
      <WeeklyCalendar
        data={sectionData?.classSchedules}
        withSafeClickMethod={true}
        onScheduleClick={({ event }) => {
          navigate({
            to: "/student/class-schedule/$scheduleId",
            params: { scheduleId: event.id },
          });
          console.log(event);
        }}
      />
    </Main>
  );
}
