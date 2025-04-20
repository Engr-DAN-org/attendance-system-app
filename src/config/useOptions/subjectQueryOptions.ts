import {
  SubjectQuery,
  SubjectTeacherQuery,
} from "@/interfaces/queryParams/subjectQuery";
import {
  SubjectQueryResponseDTO,
  SubjectTeachersResponseDTO,
} from "@/interfaces/types/queryResponseDTO";
import {
  getQueryAsync,
  querySubjectTeachersAsync,
} from "@/services/subject.service";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export const subjectQueryOption = (
  query: SubjectQuery
): UseQueryOptions<SubjectQueryResponseDTO, Error> => {
  return queryOptions<SubjectQueryResponseDTO, Error>({
    queryKey: ["subjects", { query }] as const,
    queryFn: async () => getQueryAsync(query),
  });
};

export const subjectTeachersQueryOption = (
  query: SubjectTeacherQuery
): UseQueryOptions<SubjectTeachersResponseDTO, Error> => {
  return queryOptions<SubjectTeachersResponseDTO, Error>({
    queryKey: ["subject/teachers", { query }] as const,
    queryFn: async () => querySubjectTeachersAsync(query),
  });
};
