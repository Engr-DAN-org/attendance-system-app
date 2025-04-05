import {
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from "@tabler/icons-react";
import { UserRole } from "@/enums/userRole";
import { UserStatus } from "@/interfaces/schemas/user";

export const callTypes = new Map<UserStatus, string>([
  ["active", "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200"],
  ["inactive", "bg-neutral-300/40 border-neutral-300"],
]);

interface userTypeInterface {
  label: UserRole;
  value: UserRole;
  icon: React.ElementType;
}

export const userTypes: userTypeInterface[] = [
  {
    label: UserRole.Admin,
    value: UserRole.Admin,
    icon: IconShield,
  },
  {
    label: UserRole.Teacher,
    value: UserRole.Teacher,
    icon: IconUserShield,
  },
  {
    label: UserRole.Teacher,
    value: UserRole.Student,
    icon: IconUsersGroup,
  },
] as const;
