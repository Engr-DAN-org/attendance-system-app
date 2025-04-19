import { BaseQueryParam } from "./baseQueryParam";

export interface SectionQuery extends BaseQueryParam {
  yearLevel?: number;
  courseCode?: number;
  courseId?: number;
  teacherId?: number;
}
