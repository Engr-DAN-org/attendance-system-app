import {
  GearIcon,
  LightningBoltIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { IconBalloon } from "@tabler/icons-react";
import {
  Atom,
  BookOpenText,
  BracesIcon,
  BrainCircuit,
  Building2,
  CalculatorIcon,
  ChartSplineIcon,
  CpuIcon,
  Cross,
  FactoryIcon,
  MapIcon,
  PackageIcon,
  PlaneIcon,
  ScaleIcon,
  ServerIcon,
} from "lucide-react";

export interface CourseIcon {
  id: number;
  icon: React.ElementType;
  color: string;
  name: string; // Added name property
}

export const courseIcons: CourseIcon[] = [
  {
    id: 0,
    icon: QuestionMarkCircledIcon,
    color:
      "bg-gray-100/60 dark:bg-gray-900/60 text-gray-500 dark:text-gray-300",
    name: "Not Set",
  },

  // Engineering (Red - Tinted Background with Opacity)
  {
    id: 1,
    icon: GearIcon,
    color: "bg-red-100/60 dark:bg-red-900/60 text-red-500 dark:text-red-300",
    name: "Gear",
  },
  {
    id: 3,
    icon: CpuIcon,
    color: "bg-red-100/60 dark:bg-red-900/60 text-red-500 dark:text-red-300",
    name: "CPU",
  },
  {
    id: 7,
    icon: LightningBoltIcon,
    color: "bg-red-100/60 dark:bg-red-900/60 text-red-500 dark:text-red-300",
    name: "Lightning Bolt",
  },
  {
    id: 15,
    icon: BracesIcon,
    color: "bg-red-100/60 dark:bg-red-900/60 text-red-500 dark:text-red-300",
    name: "Braces", // Assuming coding/software eng.
  },

  // Technology (Yellow - Tinted Background with Opacity)
  {
    id: 4,
    icon: ChartSplineIcon,
    color:
      "bg-yellow-100/60 dark:bg-yellow-900/60 text-yellow-500 dark:text-yellow-300",
    name: "Chart Spline", // Data/Analytics
  },
  {
    id: 8,
    icon: ServerIcon,
    color:
      "bg-yellow-100/60 dark:bg-yellow-900/60 text-yellow-500 dark:text-yellow-300",
    name: "Server",
  },
  {
    id: 9,
    icon: PackageIcon,
    color:
      "bg-yellow-100/60 dark:bg-yellow-900/60 text-yellow-500 dark:text-yellow-300",
    name: "Package", // Distribution/Systems
  },

  // Education (Blue - Tinted Background with Opacity)
  {
    id: 10,
    icon: BookOpenText,
    color:
      "bg-blue-100/60 dark:bg-blue-900/60 text-blue-500 dark:text-blue-300",
    name: "Book Open Text",
  },
  {
    id: 12,
    icon: CalculatorIcon,
    color:
      "bg-blue-100/60 dark:bg-blue-900/60 text-blue-500 dark:text-blue-300",
    name: "Calculator", // Math/Science Ed.
  },
  {
    id: 2,
    icon: Building2,
    color:
      "bg-blue-100/60 dark:bg-blue-900/60 text-blue-500 dark:text-blue-300",
    name: "Building", // Architecture/Planning Ed.
  },

  // Medicine (Purple - Tinted Background with Opacity)
  {
    id: 13,
    icon: Cross,
    color:
      "bg-purple-100/60 dark:bg-purple-900/60 text-purple-500 dark:text-purple-300",
    name: "Cross",
  },
  {
    id: 14,
    icon: PersonIcon,
    color:
      "bg-purple-100/60 dark:bg-purple-900/60 text-purple-500 dark:text-purple-300",
    name: "Person", // Health-related
  },
  {
    id: 16,
    icon: BrainCircuit,
    color:
      "bg-purple-100/60 dark:bg-purple-900/60 text-purple-500 dark:text-purple-300",
    name: "Brain Circuit", // Neuroscience/Psychology
  },

  // Hospitality Management (Green - Tinted Background with Opacity)
  {
    id: 5,
    icon: FactoryIcon,
    color:
      "bg-green-100/60 dark:bg-green-900/60 text-green-500 dark:text-green-300",
    name: "Factory", // Food Production/Management
  },
  {
    id: 17,
    icon: PlaneIcon,
    color:
      "bg-green-100/60 dark:bg-green-900/60 text-green-500 dark:text-green-300",
    name: "Plane", // Tourism
  },
  {
    id: 18,
    icon: MapIcon,
    color:
      "bg-green-100/60 dark:bg-green-900/60 text-green-500 dark:text-green-300",
    name: "Map", // Geography related to tourism
  },
  {
    id: 19,
    icon: IconBalloon,
    color:
      "bg-green-100/60 dark:bg-green-900/60 text-green-500 dark:text-green-300",
    name: "Balloon", // Events
  },

  // Remaining Icons (assigning based on potential relevance - Tinted Background with Opacity)
  {
    id: 6,
    icon: ScaleIcon,
    color:
      "bg-slate-100/60 dark:bg-slate-900/60 text-slate-500 dark:text-slate-300",
    name: "Scale", // Could be general science/measurement
  },
  {
    id: 11,
    icon: Atom,
    color:
      "bg-cyan-100/60 dark:bg-cyan-900/60 text-cyan-500 dark:text-cyan-300",
    name: "Atom", // Chemistry/Physics
  },
];
