import { SubjectQuery } from "@/interfaces/queryParams/subjectQuery";
import { SubjectQueryResponseDTO } from "@/interfaces/types/queryResponseDTO";
import { getQueryAsync } from "@/services/subject.service";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export const subjectQueryOption = (
  query: SubjectQuery
): UseQueryOptions<SubjectQueryResponseDTO, Error> => {
  return queryOptions<SubjectQueryResponseDTO, Error>({
    queryKey: ["subjects", { query }] as const,
    queryFn: async () => getQueryAsync(query),
  });
};
