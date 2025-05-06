import { z } from "zod";
// import { GetProfileDTO } from "./profile";
import { userStatusSchema } from "@/enums/userStatus";
import { userRoleSchema } from "@/enums/userRole";
import { guardianSchema } from "./guardian";
import { sectionSchema } from "./section";
import { subjectTeacherSchema } from "./subject";

const baseUserCredSchema = z.object({
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
  sectionId: z.number().optional(),
});

const baseUserSchema = baseUserCredSchema.extend({
  guardian: guardianSchema.optional().describe("Guardian"),
});

const userCredFormSchema = baseUserCredSchema.superRefine((data, ctx) => {
  if (data.userRole === "Student") {
    if (!data.sectionId) {
      ctx.addIssue({
        path: ["sectionId"],
        code: z.ZodIssueCode.custom,
        message: "Please Assign to a Section.",
      });
    }
  }
});

// Step 1: Base schema for form handling/step 1 validation
const userCompleteFormSchema = baseUserSchema.superRefine((data, ctx) => {
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
  section: z
    .lazy(() => sectionSchema)
    .optional()
    .describe("Section"),
  guardianId: z.number().optional(),
  subjectTeachers: z.array(subjectTeacherSchema).optional(),
});

type UserCredForm = z.infer<typeof userCredFormSchema>;
type UserCompleteForm = z.infer<typeof userCompleteFormSchema>;
type User = z.infer<typeof userSchema>;

export type { User, UserCredForm, UserCompleteForm };
export { userSchema, userCredFormSchema, userCompleteFormSchema };
export const userListSchema = z.array(userSchema);
