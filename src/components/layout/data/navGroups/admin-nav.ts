import { NavGroup } from "@/interfaces/types/sidebar";
import {
  IconLayoutDashboard,
  IconUsers,
  IconBook,
  IconCalendar,
  IconBuilding,
} from "@tabler/icons-react";
import { LinkProps } from "@tanstack/react-router";

const adminUrl: LinkProps["to"] = "/admin";

export const adminNavGroups: NavGroup[] = [
  {
    title: "Overview", // More descriptive than "General"
    items: [
      {
        title: "Dashboard",
        url: adminUrl,
        icon: IconLayoutDashboard,
      },
    ],
  },
  {
    title: "Organization Management", // Grouping for academic-related items
    items: [
      {
        title: "Users",
        url: `${adminUrl}/users`, // Added users
        icon: IconUsers,
      },
      {
        title: "Courses",
        url: `${adminUrl}/courses`,
        icon: IconBuilding,
      },
      {
        title: "Sections",
        url: `${adminUrl}/sections`,
        icon: IconBuilding, // Appropriate Icon for sections.
      },
      {
        title: "Subjects",
        url: `${adminUrl}/subjects`, //Added subjects
        icon: IconBook, // appropriate Icon for subjects
      },
      {
        title: "Class Schedules",
        url: `${adminUrl}/class-schedules`, //Added schedules
        icon: IconCalendar, // Appropriate Icon for schedules.
      },
    ],
  },
];
