import { Course } from "./course";
import { Subject, SubjectTeacher } from "./subject";
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

type SubjectTeachersResponseDTO = SubjectTeacher[];

export type {
  SubjectTeachersResponseDTO,
  CourseQueryResponseDTO,
  UserQueryResponseDTO,
  SubjectQueryResponseDTO,
};
