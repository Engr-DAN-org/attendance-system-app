import { SectionQuery } from "@/interfaces/queryParams/sectionQuery";
import { SectionQueryResponseDTO } from "@/interfaces/types/queryResponseDTO";
import { getQueryAsync } from "@/services/section.service";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export const SectionQueryOption = (
  query: SectionQuery
): UseQueryOptions<SectionQueryResponseDTO, Error> => {
  return queryOptions<SectionQueryResponseDTO, Error>({
    queryKey: ["sections", { query }] as const,
    queryFn: async () => getQueryAsync(query),
  });
};
