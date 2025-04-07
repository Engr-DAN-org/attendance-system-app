import { CourseQuery } from "@/interfaces/queryParams/courseQuery";
import { CourseQueryResponseDTO } from "@/interfaces/types/queryResponseDTO";
// import { Course } from "@/interfaces/types/course";
import { getQueryAsync } from "@/services/course.service";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export const CourseQueryOption = (
  query: CourseQuery
): UseQueryOptions<CourseQueryResponseDTO, Error> => {
  return queryOptions<CourseQueryResponseDTO, Error>({
    queryKey: ["courses", { query }] as const,
    queryFn: async () => getQueryAsync(query),
  });
};

// const sampleCourses: Course[] = [
//   {
//     id: 1,
//     name: "Bachelor of Science in Computer Science",
//     code: "BSCS",
//     years: "4",
//     description:
//       "Focuses on the study of algorithms, computer systems, and software design.",
//   },
//   {
//     id: 2,
//     name: "Bachelor of Science in Information Technology",
//     code: "BSIT",
//     years: "4",
//     description:
//       "Emphasizes software development, networking, and systems management.",
//   },
//   {
//     id: 3,
//     name: "Bachelor of Arts in Communication",
//     code: "BAComm",
//     years: "4",
//     description:
//       "Covers media studies, public relations, and interpersonal communication.",
//   },
//   {
//     id: 4,
//     name: "Bachelor of Science in Business Administration",
//     code: "BSBA",
//     years: "4",
//     description:
//       "Prepares students for careers in management, marketing, and finance.",
//   },
//   {
//     id: 5,
//     name: "Bachelor of Secondary Education - Major in English",
//     code: "BSEd-Eng",
//     years: "4",
//     description:
//       "Prepares future educators for teaching English at the secondary level.",
//   },
//   {
//     id: 6,
//     name: "Bachelor of Science in Nursing",
//     code: "BSN",
//     years: "4",
//     description:
//       "Equips students with knowledge and skills in health care and patient treatment.",
//   },
// ];
