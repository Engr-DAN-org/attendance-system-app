import { AppSidebar } from "@/components/layout/app-sidebar";
import SkipToMain from "@/components/skip-to-main";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { getProfileAsync } from "@/services/auth.service";
import { getSidebarData } from "@/components/layout/data/sidebar-data";
import { useAuthStore } from "@/store/authStore";
import { Header } from "@/components/layout/header";
import { TopNav } from "@/components/layout/top-nav";
import { ThemeSwitch } from "@/components/theme-switch";
import { ProfileDropdown } from "@/components/profile-dropdown";
import InstallPromptButton from "@/components/install-app-button";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { authStore, queryClient } = context;
    const { isAuthenticated } = authStore;

    // Check if the user is authenticated before loading the route
    const isLoggedIn: boolean = isAuthenticated();
    if (!isLoggedIn) throw redirect({ to: "/sign-in" });

    await queryClient.prefetchQuery({
      queryKey: ["userProfile"],
      queryFn: async () => {
        const userProfile = await getProfileAsync();
        authStore.setUser(userProfile);
        console.log(authStore.user);
        return userProfile;
      },
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore((state) => state);
  console.log(user);
  const sidebarData = getSidebarData(user);

  const defaultOpen = Cookies.get("sidebar:state") !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SkipToMain />
      <AppSidebar sidebarData={sidebarData} role={user.role} />
      <div
        id="content"
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "transition-[width] duration-200 ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh"
        )}
      >
        {/* ===== Top Heading ===== */}
        <Header>
          <TopNav />
          <div className="ml-auto flex items-center space-x-4">
            <InstallPromptButton />
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>

        <Outlet />
      </div>
    </SidebarProvider>
  );
}
