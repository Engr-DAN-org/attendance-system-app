import { BaseQueryParam } from "./baseQueryParam";

export interface SectionQuery extends BaseQueryParam {
  yearLevel: number | null;
  courseCode: number | null;
  teacherId: number | null;
}
