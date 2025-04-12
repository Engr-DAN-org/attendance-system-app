import { CourseQuery } from "@/interfaces/queryParams/courseQuery";

const initialCourseQuery: CourseQuery = {
  code: null,
  name: null,
  years: null,
  page: 1,
  sort: "asc",
};

export { initialCourseQuery };
