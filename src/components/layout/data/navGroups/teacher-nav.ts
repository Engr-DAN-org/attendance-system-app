import { NavGroup } from "@/interfaces/types/sidebar";
import { IconChecklist, IconLayoutDashboard } from "@tabler/icons-react";
import { LinkProps } from "@tanstack/react-router";

const teacherUrl: LinkProps["to"] = "/teacher";
const general: NavGroup = {
  title: "General",
  items: [
    {
      title: "Dashboard",
      url: teacherUrl,
      icon: IconLayoutDashboard,
    },
    {
      title: "Class Schedule",
      url: teacherUrl + "/class-schedule",
      icon: IconChecklist,
    },
  ],
};

export const teacherNavGroups: NavGroup[] = [general];
