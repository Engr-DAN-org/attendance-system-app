import { NavGroup } from "@/interfaces/types/sidebar";
import { IconChecklist, IconLayoutDashboard } from "@tabler/icons-react";
import { LinkProps } from "@tanstack/react-router";

const teacherUrl: LinkProps["to"] = "/teacher";
const general: NavGroup = {
  title: "General",
  items: [
    {
      title: "Quick Access",
      url: teacherUrl,
      icon: IconLayoutDashboard,
    },
    {
      title: "Weekly Schedule",
      url: (teacherUrl + "/class-schedule") as LinkProps["to"],
      icon: IconChecklist,
    },
  ],
};

export const teacherNavGroups: NavGroup[] = [general];
