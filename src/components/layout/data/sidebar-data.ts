import { User } from "lucide-react";
import { UserRole } from "@/enums/userRole";
import { AccountProfile, SidebarData } from "@/interfaces/types/sidebar";
import { User as UserType } from "@/interfaces/types/user";
import { SidebarHeaderProfile } from "@/interfaces/types/profile";
import { systemName } from "@/context/system-context";
import { adminNavGroups } from "./navGroups/admin-nav";
import { teacherNavGroups } from "./navGroups/teacher-nav";

const adminProfile: SidebarHeaderProfile = {
  nameOrTitle: systemName.title,
  roleOrDescription: systemName.description,
  icon: systemName.icon,
};

export function getSidebarData(user: UserType | null): SidebarData {
  if (!user) throw new Error("User is null");

  const userProfile: SidebarHeaderProfile = {
    nameOrTitle: user.fullName,
    roleOrDescription: user.role,
    icon: User,
  };

  const accountProfiles: AccountProfile[] =
    user.role == UserRole.Admin
      ? [
          {
            header: adminProfile,
            navgroups: adminNavGroups,
          },
          {
            header: userProfile,
            navgroups: teacherNavGroups,
          },
        ]
      : [
          {
            header: userProfile,
            navgroups: [],
          },
        ];

  const sidebarData: SidebarData = {
    user: user,
    profiles: accountProfiles,
  };

  return sidebarData;
}
