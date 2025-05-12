import { z } from "zod";

export enum ClassSessionStatus {
  // Created = "Created",
  Started = "Started",
  Ended = "Ended",
  Canceled = "Canceled",
}

export const classSessionStatus = z.nativeEnum(ClassSessionStatus);
export type ClassSessionStatusType = z.infer<typeof classSessionStatus>;

export const classSessionStatusCallTypes = new Map<ClassSessionStatus, string>([
  // [
  //   ClassSessionStatus.Created,
  //   "bg-gray-100/40 text-gray-800 dark:text-gray-200 border-gray-200",
  // ],
  [
    ClassSessionStatus.Started,
    "bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200",
  ],
  [
    ClassSessionStatus.Ended,
    "bg-green-100/30 text-green-900 dark:text-green-200 border-green-200",
  ],
  [
    ClassSessionStatus.Canceled,
    "bg-rose-100/30 text-rose-900 dark:text-rose-200 border-rose-200",
  ],
]);
