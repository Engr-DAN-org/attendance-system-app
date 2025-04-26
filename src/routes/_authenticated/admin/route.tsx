import { Main } from "@/components/layout/main";
import { SelectDataContextProvider } from "@/context/select-data-context";
import {
  createFileRoute,
  LinkProps,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad({ context }) {
    const { isAdmin, getRedirectPath } = context.authStore;
    if (!isAdmin()) {
      const path: LinkProps["to"] = getRedirectPath();
      throw redirect({ to: path });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SelectDataContextProvider>
      {/* ===== Main ===== */}
      <Main>
        <Outlet />
      </Main>
    </SelectDataContextProvider>
  );
}
