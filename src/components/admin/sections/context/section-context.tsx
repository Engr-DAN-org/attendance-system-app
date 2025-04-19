import { useSectionLogic } from "@/use-logic/use-section.logic";
import { createContext, ReactNode, useContext } from "react";

const SectionContext = createContext<
  ReturnType<typeof useSectionLogic> | undefined
>(undefined);

export const SectionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useSectionLogic();

  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSectionContext = () => {
  const ctx = useContext(SectionContext);
  if (!ctx)
    throw new Error(
      "useSectionContext must be used within the Section Provider"
    );
  return ctx;
};
