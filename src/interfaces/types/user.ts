import { z } from "zod";
// import { GetProfileDTO } from "./profile";
import { UserStatus } from "@/enums/userStatus";
import { userRoleSchema, UserRoleType } from "@/enums/userRole";
import { guardianSchema } from "./guardian";

// interface User extends GetProfileDTO {
//   id: string;
//   status: UserStatus;
// }

type User = ReturnType<typeof userSchema.parse> & {
  status: UserStatus;
  fullName: string;
  role: UserRoleType;
  guardianId?: number | null;
};

type UserForm = z.infer<typeof userSchema>;

const userSchema = z
  .object({
    id: z.string().optional(),
    idNumber: z
      .string()
      .min(6, "ID Number is required.")
      .max(8, "ID Number must not exceed the 8-digit limit.")
      .describe("ID Number")
      .refine((val) => {
        // Check if the value is a number and has 6 to 8 digits
        const regex = /^[0-9]{6,8}$/;
        return regex.test(val);
      }, "ID Number must not contain non-numeric characters."),
    firstName: z
      .string()
      .min(1, "First name is required.")
      .describe("First Name"),
    lastName: z.string().min(1, "Last name is required.").describe("Last Name"),
    email: z.string().email().describe("Email"),
    phoneNumber: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true; // Allow empty since it's optional
          return /^[0-9]{10,11}$/.test(val);
        },
        {
          message: "Phone number must be 10 to 11 digits.",
        }
      )
      .describe("Phone Number"),
    userRole: userRoleSchema,
    guardian: guardianSchema.optional().describe("Guardian"),
  })
  .superRefine((data, ctx) => {
    if (data.userRole === "Student") {
      if (!data.guardian) {
        ctx.addIssue({
          path: ["guardian"],
          code: z.ZodIssueCode.custom,
          message: "Guardian is required for students.",
        });
      }

      // if (!data.section || data.section.trim() === "") {
      //   ctx.addIssue({
      //     path: ["section"],
      //     code: z.ZodIssueCode.custom,
      //     message: "Section is required for students.",
      //   });
      // }
    }
  });

// const studentSchema = userSchema({
//   // Add student-specific fields here
// });

// const teacherSchema = userSchema.extend({
//   // Add teacher-specific fields here
// });

export type { User, UserForm };
export { userSchema };
export const userListSchema = z.array(userSchema);
