import { z } from "zod";
import { GetProfileDTO } from "./profile";
import { userStatusSchema } from "@/enums/userStatus";
import { userRoleSchema } from "@/enums/userRole";

type User = GetProfileDTO;

const userSchema = z.object({
  idNumber: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  status: userStatusSchema,
  role: userRoleSchema,
});

export type { User };
export { userSchema };
export const userListSchema = z.array(userSchema);
