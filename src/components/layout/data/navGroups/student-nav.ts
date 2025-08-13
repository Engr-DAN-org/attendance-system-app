import { NavGroup } from "@/interfaces/types/sidebar";
import { IconCalendar, IconQrcode, IconTimeline } from "@tabler/icons-react"; // Import relevant icons
import { LinkProps } from "@tanstack/react-router";
import settings from "./settings-nav";

const studentUrl: LinkProps["to"] = "/student";

export const studentNavGroups: NavGroup[] = [
  {
    title: "Overview", // Changed from "General" for better clarity
    items: [
      {
        title: "Attendance Summary",
        url: studentUrl,
        icon: IconTimeline, // Use appropriate icon
      },
      {
        title: "Class Schedule",
        url: `${studentUrl}/class-schedule` as LinkProps["to"],
        icon: IconCalendar, // Use calendar icon
      },
    ],
  },
  {
    title: "Attendance Actions", // More descriptive group name
    items: [
      {
        title: "Scan QR Code",
        url: "/student/qr-scan", // Direct link to QR scan page
        icon: IconQrcode, // Use QR code icon
      },
    ],
  },

  settings,
];
