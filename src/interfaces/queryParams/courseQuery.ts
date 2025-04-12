import { BaseQueryParam } from "./baseQueryParam";

export interface CourseQuery extends BaseQueryParam {
  code: string | null;
  years: number | null;
}
