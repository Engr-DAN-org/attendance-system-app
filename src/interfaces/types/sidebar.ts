import { LinkProps } from "@tanstack/react-router";
import { SidebarHeaderProfile } from "./profile";
import { User } from "./user";

type NavItem = NavCollapsible | NavLink;

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps["to"] })[];
  url?: never;
};

type NavLink = BaseNavItem & {
  url: LinkProps["to"];
  items?: never;
};

interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: React.ElementType;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface AccountProfile {
  header: SidebarHeaderProfile;
  navgroups: NavGroup[];
}

interface SidebarData {
  user: User;
  profiles: AccountProfile[];
}

export type {
  NavGroup,
  AccountProfile,
  NavItem,
  NavCollapsible,
  NavLink,
  SidebarData,
};
