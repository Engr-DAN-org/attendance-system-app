import { z } from "zod";

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
  Suspended = "Suspended",
}

export const userStatusSchema = z.nativeEnum(UserStatus);
export type UserStatusType = z.infer<typeof userStatusSchema>;

export const UserStatusOptions: { value: UserStatusType; label: string }[] =
  Object.values(UserStatus).map((value) => ({
    value,
    label: value,
  }));

export type UserStatusOption = (typeof UserStatusOptions)[number];
export type UserStatusOptionValue = UserStatusOption["value"];
export type UserStatusOptionLabel = UserStatusOption["label"];

export const statusCallTypes = new Map<UserStatus, string>([
  [
    UserStatus.Active,
    "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200",
  ],
  [UserStatus.Inactive, "bg-neutral-300/40 border-neutral-300"],
  [
    UserStatus.Suspended,
    "bg-red-100/30 text-red-900 dark:text-red-200 border-red-200",
  ],
]);
