import { useTeacherLogic } from "@/use-logic/use-teacher.logic";
import { createContext, ReactNode, useContext } from "react";

const TeacherContext = createContext<
  ReturnType<typeof useTeacherLogic> | undefined
>(undefined);

export const TeacherContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useTeacherLogic();
  return (
    <TeacherContext.Provider value={value}>{children}</TeacherContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTeacherContext = () => {
  const ctx = useContext(TeacherContext);
  if (!ctx)
    throw new Error(
      "useTeacherContext must be used within TeacherContextProvider"
    );
  return ctx;
};
