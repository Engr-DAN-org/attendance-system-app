import { useSectionCreationLogic } from "@/use-logic/use-section.logic";
import { createContext, ReactNode, useContext } from "react";

const SectionCreationContext = createContext<
  ReturnType<typeof useSectionCreationLogic> | undefined
>(undefined);

export const SectionCreationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useSectionCreationLogic();

  return (
    <SectionCreationContext.Provider value={value}>
      {children}
    </SectionCreationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSectionCreationContext = () => {
  const ctx = useContext(SectionCreationContext);
  if (!ctx)
    throw new Error(
      "useSectionCreationContext must be used within the SectionCreation Provider"
    );
  return ctx;
};
