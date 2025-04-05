import { NavGroup } from "@/interfaces/types/sidebar";
import {
  IconCalendar,
  IconQrcode,
  IconListCheck,
  IconTimeline,
} from "@tabler/icons-react"; // Import relevant icons
import { LinkProps } from "@tanstack/react-router";

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
        url: `${studentUrl}/class-schedule`,
        icon: IconCalendar, // Use calendar icon
      },
    ],
  },
  {
    title: "Attendance Actions", // More descriptive group name
    items: [
      {
        title: "Attendance History", // More descriptive and less redundant
        url: `${studentUrl}/attendance`,
        icon: IconListCheck, // Use a checklist icon
      },
      {
        title: "Scan QR Code",
        url: `${studentUrl}/scan-qr-code`,
        icon: IconQrcode, // Use QR code icon
      },
    ],
  },
];
