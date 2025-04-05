import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { TopNav } from "@/components/layout/top-nav";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeSwitch } from "@/components/theme-switch";
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
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      {/* ===== Main ===== */}
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
    disabled: false,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
    disabled: true,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
    disabled: true,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
    disabled: true,
  },
];
