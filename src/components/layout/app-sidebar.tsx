import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/layout/nav-group";
import { NavUser } from "@/components/layout/nav-user";
import { AccountSwitcher } from "@/components/layout/account-switcher";
import { userProfile } from "@/interfaces/resource/user";
import { SidebarData } from "@/interfaces/types/sidebar";
import { useAuthStore } from "@/store/authStore";

export function AppSidebar({
  sidebarData,
  ...props
}: {
  sidebarData: SidebarData;
  props?: React.ComponentProps<typeof Sidebar>;
}) {
  const { profileIndex } = useAuthStore((state) => state);
  const { profiles } = sidebarData;
  const profile = profiles[profileIndex] || profiles[0];
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <AccountSwitcher profiles={profiles} />
      </SidebarHeader>
      <SidebarContent>
        {profile.navgroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userProfile(sidebarData.user)} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
