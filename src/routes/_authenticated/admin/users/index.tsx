// import Users from "@/components/admin/users";
import Users from "@/components/admin/users";
import { UsersContextProvider } from "@/components/admin/users/context/users-context";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <UsersContextProvider>
      <Users />
    </UsersContextProvider>
  );
}
