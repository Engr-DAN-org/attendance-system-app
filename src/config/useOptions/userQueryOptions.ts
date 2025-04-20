import { UserQuery } from "@/interfaces/queryParams/userQuery";
import { UserQueryResponseDTO } from "@/interfaces/types/queryResponseDTO";
import { getQueryAsync } from "@/services/user.service";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export const userQueryOption = (
  query: UserQuery
): UseQueryOptions<UserQueryResponseDTO, Error> => {
  return queryOptions<UserQueryResponseDTO, Error>({
    queryKey: ["users", { query }] as const,
    queryFn: async () => getQueryAsync(query),
  });
};
