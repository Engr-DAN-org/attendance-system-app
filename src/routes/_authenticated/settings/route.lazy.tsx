import { createLazyFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { Main } from "@/components/layout/main";
import SidebarNav from "@/components/sidebar-nav";
import settings from "@/components/layout/data/navGroups/settings-nav";
import { ProfileContextProvider } from "@/components/general/context/profile.contex";

export const Route = createLazyFileRoute("/_authenticated/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <ProfileContextProvider>
        <Main fixed>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>
          <Separator className="my-4 lg:my-6" />
          <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="top-0 lg:sticky lg:w-1/5">
              <SidebarNav
                items={settings.items.map((item) => {
                  return {
                    href: item.url,
                    title: item.title,
                    icon: item.icon ? <item.icon /> : <span />, // Provide a fallback ReactElement
                  };
                })}
              />
            </aside>
            <div className="flex w-full overflow-y-hidden p-1 pr-4">
              <Outlet />
            </div>
          </div>
        </Main>
      </ProfileContextProvider>
    </>
  );
}
