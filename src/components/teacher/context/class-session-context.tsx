import { useClassSessionLogic } from "@/use-logic/use-class-session.logic";
import { createContext, ReactNode, useContext } from "react";

const ClassSessionContext = createContext<
  ReturnType<typeof useClassSessionLogic> | undefined
>(undefined);

export const ClassSessionProvider = ({ children }: { children: ReactNode }) => {
  const value = useClassSessionLogic();

  return (
    <ClassSessionContext.Provider value={value}>
      {children}
    </ClassSessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useClassSessionContext = () => {
  const context = useContext(ClassSessionContext);
  if (context === undefined) {
    throw new Error(
      "useClassSessionContext must be used within a ClassSessionProvider"
    );
  }
  return context;
};
