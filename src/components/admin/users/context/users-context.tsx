import { useUserLogic } from "@/components/admin/users/context/use-user-logic";
import { createContext, ReactNode, useContext } from "react";

// context/CourseContext.tsx
const UsersContext = createContext<ReturnType<typeof useUserLogic> | undefined>(
  undefined
);

export const UsersContextProvider = ({ children }: { children: ReactNode }) => {
  const value = useUserLogic(); // formerly useCourseForm
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserQueryContext = () => {
  const ctx = useContext(UsersContext);
  if (!ctx)
    throw new Error(
      "useUserQueryContext must be used within UserQueryContextProvider"
    );
  return ctx;
};
