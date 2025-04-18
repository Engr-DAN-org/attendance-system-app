import { useSubjectLogic } from "@/use-logic/use-subject.logic";
import { createContext, ReactNode, useContext } from "react";

const SubjectContext = createContext<
  ReturnType<typeof useSubjectLogic> | undefined
>(undefined);

export const SubjectContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useSubjectLogic();
  return (
    <SubjectContext.Provider value={value}>{children}</SubjectContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSubjectContext = () => {
  const ctx = useContext(SubjectContext); //add context here
  if (!ctx)
    throw new Error(
      "useSectionCreationContext must be used within the SectionCreation Provider"
    );
  return ctx;
};
