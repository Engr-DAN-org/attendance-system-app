import { ClassScheduleContextProvider } from "@/components/admin/class-schedule/class-schedule-context";
import { TeacherContextProvider } from "@/components/teacher/context/teacher.context";
import {
  createFileRoute,
  LinkProps,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/teacher")({
  beforeLoad({ context }) {
    const { isStudent, getRedirectPath } = context.authStore;
    if (isStudent()) {
      const path: LinkProps["to"] = getRedirectPath();
      throw redirect({ to: path });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ClassScheduleContextProvider>
      <TeacherContextProvider>
        <Outlet />
      </TeacherContextProvider>
    </ClassScheduleContextProvider>
  );
}
