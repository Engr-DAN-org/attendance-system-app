export enum UserRole {
  Teacher = "Teacher",
  Student = "Student",
  Admin = "Admin",
}

export const UserRoleOptions = Object.values(UserRole).map((value) => ({
  value,
  label: value,
}));

export type UserRoleType = keyof typeof UserRole;
export type UserRoleOption = (typeof UserRoleOptions)[number];
export type UserRoleOptionValue = UserRoleOption["value"];
