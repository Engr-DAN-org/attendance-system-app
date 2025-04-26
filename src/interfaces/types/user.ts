import { z } from "zod";
// import { GetProfileDTO } from "./profile";
import { userStatusSchema } from "@/enums/userStatus";
import { userRoleSchema } from "@/enums/userRole";
import { guardianSchema } from "./guardian";
import { sectionSchema } from "./section";

const baseUserSchema = z.object({
  id: z.string().optional(),
  idNumber: z
    .string()
    .min(1, "ID Number is required.")
    .min(6, "ID Number must be at least 6 Digits.")
    .max(8, "ID Number must not exceed the 8-digit limit.")
    .describe("ID Number")
    .refine((val) => /^[0-9]{6,8}$/.test(val), {
      message: "ID Number must not contain non-numeric characters.",
    }),
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
        if (!val) return true;
        return /^[0-9]{10,11}$/.test(val);
      },
      { message: "Phone number must be 10 to 11 digits." }
    )
    .describe("Phone Number"),
  userRole: userRoleSchema,
  guardian: guardianSchema.optional().describe("Guardian"),
  sectionId: z.number().optional(),
});

// Step 1: Base schema for form handling/step 1 validation
const userFormSchema = baseUserSchema.superRefine((data, ctx) => {
  if (data.userRole === "Student") {
    if (!data.guardian) {
      ctx.addIssue({
        path: ["guardian"],
        code: z.ZodIssueCode.custom,
        message: "Guardian is required for registration.",
      });
    }
    if (!data.sectionId) {
      ctx.addIssue({
        path: ["sectionId"],
        code: z.ZodIssueCode.custom,
        message: "Please Assign to a Section.",
      });
    }
  }
});

const userSchema: z.ZodSchema = baseUserSchema.extend({
  fullName: z.string().optional(),
  status: userStatusSchema,
  role: userRoleSchema,
  section: sectionSchema.optional().describe("Section"),
  guardianId: z.number().optional(),
});

type UserForm = z.infer<typeof userFormSchema>;
type User = z.infer<typeof userSchema>;

export type { User, UserForm };
export { userSchema, userFormSchema };
export const userListSchema = z.array(userSchema);
