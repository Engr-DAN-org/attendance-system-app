import { Course } from "./course";
import { User } from "./user";

interface BaseQueryResponse<T> {
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
  data: T[];
}

type CourseQueryResponseDTO = BaseQueryResponse<Course>;
type UserQueryResponseDTO = BaseQueryResponse<User>;

export type { CourseQueryResponseDTO, UserQueryResponseDTO };
