import { initialSectionQuery } from "@/initialStates/queryStates";
import { SectionQuery } from "@/interfaces/queryParams/sectionQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useSectionLogic = () => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState<SectionQuery>(initialSectionQuery);

  return {
    query,
    setQuery,
  };
};
