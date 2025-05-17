import { useStudentLogic } from "@/use-logic/use-student.logic";
import { createContext, ReactNode, useContext } from "react";

const StudentContext = createContext<
  ReturnType<typeof useStudentLogic> | undefined
>(undefined);

export const StudentContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useStudentLogic();
  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStudentContext = () => {
  const ctx = useContext(StudentContext);
  if (!ctx)
    throw new Error(
      "useStudentContext must be used within StudentContextProvider"
    );
  return ctx;
};
