import { CourseQuery } from "@/interfaces/queryParams/courseQuery";
import { SectionQuery } from "@/interfaces/queryParams/sectionQuery";

const initialCourseQuery: CourseQuery = {
  code: null,
  name: null,
  years: null,
  page: 1,
  sort: "asc",
};

const initialSectionQuery: SectionQuery = {
  name: null,
  page: 1,
  sort: "asc",
  courseCode: null,
  yearLevel: null,
  teacherId: null,
};

export { initialCourseQuery, initialSectionQuery };
