export enum StudentGuardianRelationship {
  Parent = "Parent",
  Guardian = "Guardian",
  Other = "Other",
}

export const StudentGuardianRelationshipOptions = Object.values(
  StudentGuardianRelationship
).map((value) => ({
  value,
  label: value,
}));

export type StudentGuardianRelationshipType =
  keyof typeof StudentGuardianRelationship;
export type StudentGuardianRelationshipValue = StudentGuardianRelationship;
export type StudentGuardianRelationshipOption =
  (typeof StudentGuardianRelationshipOptions)[number];
