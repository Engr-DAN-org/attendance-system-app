import { z } from "zod";
import {
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from "@tabler/icons-react";

export enum UserRole {
  Admin = "Admin",
  Teacher = "Teacher",
  Student = "Student",
}

export const UserRoleOptions: { value: UserRoleType; label: string }[] =
  Object.values(UserRole)
    .filter((value) => value !== UserRole.Admin)
    .map((value) => ({
      value,
      label: value,
    }));

export const userRoleSchema = z.nativeEnum(UserRole).describe("User Role");
export type UserRoleType = z.infer<typeof userRoleSchema>;
export type UserRoleOption = (typeof UserRoleOptions)[number];
export type UserRoleOptionValue = UserRoleOption["value"];

export interface userTypeInterface {
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
    label: UserRole.Student,
    value: UserRole.Student,
    icon: IconUsersGroup,
  },
] as const;
