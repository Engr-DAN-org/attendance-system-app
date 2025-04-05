import { User } from "lucide-react";
import { SidebarHeaderProfile, UserProfile } from "../types/profile";
import { User as UserType } from "../types/user";

const userProfile = (user: UserType): UserProfile => {
  return {
    name: user.fullName,
    email: user.email,
    icon: User,
  };
};

const sidebarProfile = (user: UserType): SidebarHeaderProfile => {
  return {
    nameOrTitle: user.fullName,
    roleOrDescription: user.role,
    icon: User,
  };
};

export { userProfile, sidebarProfile };
