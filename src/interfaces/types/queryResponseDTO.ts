import { Course } from "./course";

interface BaseQueryResponse<T> {
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
  data: T[];
}

type CourseQueryResponseDTO = BaseQueryResponse<Course>;

export type { CourseQueryResponseDTO };
