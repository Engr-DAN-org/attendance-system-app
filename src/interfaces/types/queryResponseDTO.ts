import { Course } from "./course";
import { Subject } from "./subject";
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
type SubjectQueryResponseDTO = BaseQueryResponse<Subject>;

export type {
  CourseQueryResponseDTO,
  UserQueryResponseDTO,
  SubjectQueryResponseDTO,
};
