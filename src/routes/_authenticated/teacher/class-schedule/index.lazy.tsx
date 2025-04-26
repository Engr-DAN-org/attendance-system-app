import WeeklyCalendar from "@/components/admin/sections/components/weekly-calendar";
import { LoadingComponent } from "@/components/general-loader";
import { Main } from "@/components/layout/main";
import { Separator } from "@/components/ui/separator";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/_authenticated/teacher/class-schedule/"
)({
  pendingComponent: LoadingComponent,
  component: RouteComponent,
});

function RouteComponent() {
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
        <WeeklyCalendar data={[]} />
      </Main>
    </>
  );
}
