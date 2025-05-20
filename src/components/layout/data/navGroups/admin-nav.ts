import { NavGroup } from "@/interfaces/types/sidebar";
import {
  // IconLayoutDashboard,
  IconUsers,
  IconBook,
  IconBuilding,
} from "@tabler/icons-react";
import { LinkProps } from "@tanstack/react-router";

const adminUrl: LinkProps["to"] = "/admin";

export const adminNavGroups: NavGroup[] = [
  // {
  //   title: "Overview", // More descriptive than "General"
  //   items: [
  //     {
  //       title: "Dashboard",
  //       url: adminUrl,
  //       icon: IconLayoutDashboard,
  //     },
  //   ],
  // },
  {
    title: "Organization Management", // Grouping for academic-related items
    items: [
      {
        title: "Users",
        url: `${adminUrl}/users` as LinkProps["to"], // Added users
        icon: IconUsers,
      },
      {
        title: "Courses",
        url: `${adminUrl}/courses` as LinkProps["to"],
        icon: IconBuilding,
      },
      {
        title: "Sections",
        url: `${adminUrl}/sections` as LinkProps["to"],
        icon: IconBuilding, // Appropriate Icon for sections.
      },
      {
        title: "Subjects",
        url: `${adminUrl}/subjects` as LinkProps["to"], //Added subjects
        icon: IconBook, // appropriate Icon for subjects
      },
    ],
  },
];
