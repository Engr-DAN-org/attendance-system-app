import { BaseQueryParam } from "./baseQueryParam";

export interface ClassScheduleQuery extends BaseQueryParam {
  teacherId?: string;
  sectionId?: number;
}
