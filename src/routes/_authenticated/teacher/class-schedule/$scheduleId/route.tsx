import { ClassSessionProvider } from "@/components/teacher/context/class-session-context";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/teacher/class-schedule/$scheduleId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ClassSessionProvider>
      <Outlet />
    </ClassSessionProvider>
  );
}
