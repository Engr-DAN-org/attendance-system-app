import { ClassScheduleContextProvider } from "@/components/admin/class-schedule/class-schedule-context";
import { StudentContextProvider } from "@/components/student/context/student.context";
import {
  createFileRoute,
  LinkProps,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/student")({
  beforeLoad({ context }) {
    const { isStudent, getRedirectPath } = context.authStore;
    if (!isStudent()) {
      const path: LinkProps["to"] = getRedirectPath();
      throw redirect({ to: path });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <StudentContextProvider>
      <ClassScheduleContextProvider>
        <Outlet />
      </ClassScheduleContextProvider>
    </StudentContextProvider>
  );
}
