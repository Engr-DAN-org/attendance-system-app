import { SectionQuery } from "@/interfaces/queryParams/sectionQuery";
import { SectionQueryResponseDTO } from "@/interfaces/types/queryResponseDTO";
import { Section } from "@/interfaces/types/section";
import { getByIdAsync, getQueryAsync } from "@/services/section.service";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export const SectionsQueryOption = (
  query: SectionQuery
): UseQueryOptions<SectionQueryResponseDTO, Error> => {
  return queryOptions<SectionQueryResponseDTO, Error>({
    queryKey: ["sections", { query }] as const,
    queryFn: async () => getQueryAsync(query),
  });
};

export const SectionQueryOption = (
  sectionId: number
): UseQueryOptions<Section, Error> => {
  return queryOptions<Section, Error>({
    queryKey: ["sections", { sectionId }],
    queryFn: async () => getByIdAsync(sectionId),
    enabled: !!sectionId && sectionId > 0,
  });
};
