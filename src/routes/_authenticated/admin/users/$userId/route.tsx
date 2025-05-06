import {
  ClassScheduleContextProvider,
  useClassScheduleContext,
} from "@/components/admin/class-schedule/class-schedule-context";
import {
  UsersContextProvider,
  useUserQueryContext,
} from "@/components/admin/users/context/users-context";
import { LoadingComponent } from "@/components/general-loader";
import { Main } from "@/components/layout/main";
import SidebarNav from "@/components/sidebar-nav";
import { Separator } from "@/components/ui/separator";
import { UserRole } from "@/enums/userRole";
import GeneralError from "@/features/errors/general-error";
import NotFoundError from "@/features/errors/not-found-error";
import { User } from "@/interfaces/types/user";
import { getByIdAsync } from "@/services/user.service";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/admin/users/$userId")({
  component: RouteComponent,
  pendingComponent: () => <LoadingComponent />,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
  loader: async ({ params }) => {
    const userId = params.userId;

    if (!userId) {
      throw new Error("User ID is required");
    }
    const user = await getByIdAsync(userId);
    return user;
  },
});

function RouteComponent() {
  return (
    <UsersContextProvider>
      <ClassScheduleContextProvider>
        <ChildRouteComponent />
      </ClassScheduleContextProvider>
    </UsersContextProvider>
  );
}

function ChildRouteComponent() {
  const userData = Route.useLoaderData<User>();
  const {
    setSelectedUser: setUser,
    selectedUser: user,
    navItems,
    setNavItems,
  } = useUserQueryContext();
  const { setTeacherId } = useClassScheduleContext();

  useEffect(() => {
    setUser(userData);
    setNavItems(userData);

    setTeacherId(userData.role == UserRole.Teacher ? userData.id : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return <LoadingComponent />;
  return (
    <Main>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {user?.role} Information
        </h1>
        <p className="text-muted-foreground">
          Detailed overview and management options for the selected{" "}
          {user?.role.toLowerCase()}.
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={navItems} />
        </aside>
        <div className="flex w-full overflow-y-hidden p-1 pr-4">
          <Outlet />
        </div>
      </div>
    </Main>
  );
}
