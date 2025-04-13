import { StudentGuardianRelationship } from "@/enums/studentGuardianRelationship";
import { z } from "zod";

export interface UpdateGuardianDTO {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber?: string;
  address: string;
  relationship: StudentGuardianRelationship;
}

//   // Default relationship value can be set when creating an instance
//   export const createUpdateGuardianDTO = (data: Partial<UpdateGuardianDTO>): UpdateGuardianDTO => ({
//     firstName: data.firstName ?? "",
//     lastName: data.lastName ?? "",
//     email: data.email ?? "",
//     contactNumber: data.contactNumber,
//     address: data.address ?? "",
//     relationship: data.relationship ?? StudentGuardianRelationship.Parent,
//   });

export interface GetGuardianDTO {
  fullName: string;
  email: string;
  contactNumber?: string;
  address: string;
  relationship: StudentGuardianRelationship;
}

export const guardianSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  contactNumber: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // Allow empty since it's optional
        return /^[0-9]{10,11}$/.test(val);
      },
      {
        message: "Contact number must be 10 to 11 digits.",
      }
    )
    .describe("Contact Number"),
  address: z.string().min(1, "Address is required."),
  relationship: z.nativeEnum(StudentGuardianRelationship),
});

// export const createGetGuardianDTO = (guardian: {
//   firstName: string;
//   lastName: string;
//   email: string;
//   contactNumber?: string;
//   address: string;
//   relationship: StudentGuardianRelationship;
// }): GetGuardianDTO => ({
//   fullName: `${guardian.firstName} ${guardian.lastName}`,
//   email: guardian.email,
//   contactNumber: guardian.contactNumber,
//   address: guardian.address,
//   relationship: guardian.relationship,
// });
