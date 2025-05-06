import { BaseQueryParam } from "./baseQueryParam";

export interface SubjectQuery extends BaseQueryParam {
  teacherId?: string[];
}

export interface SubjectTeacherQuery {
  name?: string;
  teacherId?: string;
  sectionId?: string;
  limit?: number;
}
