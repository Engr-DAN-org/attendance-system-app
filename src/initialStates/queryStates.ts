import { CourseQuery } from "@/interfaces/queryParams/courseQuery";
import { SectionQuery } from "@/interfaces/queryParams/sectionQuery";
import { UserQuery } from "@/interfaces/queryParams/userQuery";

const baseQueryState = {
  page: 1,
  sort: "asc" as "asc" | "desc",
  name: null,
};

const initialCourseQuery: CourseQuery = {
  code: null,
  years: null,
  ...baseQueryState,
};

const initialSectionQuery: SectionQuery = {
  ...baseQueryState,
  courseCode: null,
  yearLevel: null,
  teacherId: null,
};

const initialUsersQuery: UserQuery = {
  ...baseQueryState,
  role: [],
  status: [],
};

const initialSubjectQuery = {
  ...baseQueryState,
  teacherId: [],
};

const initialSubjectTeacherQuery = {
  name: "",
};

export {
  initialSubjectTeacherQuery,
  initialCourseQuery,
  initialSectionQuery,
  initialUsersQuery,
  initialSubjectQuery,
};
