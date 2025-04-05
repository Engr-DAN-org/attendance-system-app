import { z } from "zod";

export enum UserRole {
  Teacher = "Teacher",
  Student = "Student",
  Admin = "Admin",
}

export const UserRoleOptions: { value: UserRoleType; label: string }[] =
  Object.values(UserRole).map((value) => ({
    value,
    label: value,
  }));

export const userRoleSchema = z.nativeEnum(UserRole);
export type UserRoleType = z.infer<typeof userRoleSchema>;
export type UserRoleOption = (typeof UserRoleOptions)[number];
export type UserRoleOptionValue = UserRoleOption["value"];
