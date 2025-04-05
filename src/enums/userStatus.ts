import { z } from "zod";

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
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
