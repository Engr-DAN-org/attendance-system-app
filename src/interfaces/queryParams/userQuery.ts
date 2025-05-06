import { UserRole } from "@/enums/userRole";
import { BaseQueryParam } from "./baseQueryParam";
import { UserStatus } from "@/enums/userStatus";

export interface UserQuery extends BaseQueryParam {
  role?: UserRole[] | [];
  status?: UserStatus[] | [];
  sectionId?: number;
}
