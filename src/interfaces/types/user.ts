import { z } from "zod";
import { GetProfileDTO } from "./profile";
import { UserStatus, userStatusSchema } from "@/enums/userStatus";
import { userRoleSchema } from "@/enums/userRole";

interface User extends GetProfileDTO {
  id: string;
  status: UserStatus;
}

const userSchema = z.object({
  idNumber: z
    .string()
    .min(6, "ID Number is required.")
    .max(8, "ID Number must be 6 to 8 digits.")
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
  phoneNumber: z.string().optional().describe("Phone Number"),
  status: userStatusSchema.optional().describe("Status"),
  role: userRoleSchema,
});

const studentSchema = userSchema.extend({
  // Add student-specific fields here
});

const teacherSchema = userSchema.extend({
  // Add teacher-specific fields here
});

export type { User };
export { userSchema, studentSchema, teacherSchema };
export const userListSchema = z.array(userSchema);
