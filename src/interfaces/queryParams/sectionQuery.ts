import { BaseQueryParam } from "./baseQueryParam";

export interface SectionQuery extends BaseQueryParam {
  yearLevel?: number;
  courseCode?: string;
  courseId?: number;
  teacherId?: number;
}
