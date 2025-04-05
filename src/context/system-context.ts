import { Command } from "lucide-react";
import * as React from "react";

export const systemName: systemAdmin = {
  title: "SAS Admin",
  description: "Student Attendance System",
  icon: Command,
};

interface systemAdmin {
  title: string;
  description: string;
  icon: React.ElementType;
}
