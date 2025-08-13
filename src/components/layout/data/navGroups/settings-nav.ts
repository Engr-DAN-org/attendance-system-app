import { NavGroup } from "@/interfaces/types/sidebar";
import { IconPalette, IconTool, IconUserCog } from "@tabler/icons-react";

const settings: NavGroup = {
  title: "Settings", // More descriptive than "General"
  items: [
    {
      title: "Profile",
      url: "/settings/profile",
      icon: IconUserCog,
    },
    {
      title: "Password",
      url: "/settings/password",
      icon: IconTool,
    },
    {
      title: "Appearance",
      url: "/settings/appearance",
      icon: IconPalette,
    },
  ],
};

export default settings;
