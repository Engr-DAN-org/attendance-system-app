import { ClassScheduleContextProvider } from "@/components/admin/class-schedule/class-schedule-context";
import {
  TeacherContextProvider,
  useTeacherContext,
} from "@/components/teacher/context/teacher.context";
import { useAuthStore } from "@/store/authStore";
import {
  createFileRoute,
  LinkProps,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { useEffect } from "react";

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
        <ChildRouteComponent />
      </TeacherContextProvider>
    </ClassScheduleContextProvider>
  );
}

function ChildRouteComponent() {
  const { user } = useAuthStore((state) => state);
  const { setAuthTeacher } = useTeacherContext();
  useEffect(() => {
    setAuthTeacher(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return <Outlet />;
}
