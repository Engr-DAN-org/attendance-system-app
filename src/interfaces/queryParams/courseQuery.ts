import { BaseQueryParam } from "./baseQueryParam";

export interface CourseQuery extends BaseQueryParam {
  name: string | null;
  code: string | null;
  years: number | null;
}
