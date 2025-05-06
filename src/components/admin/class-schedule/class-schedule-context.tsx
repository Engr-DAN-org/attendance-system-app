import { useClassScheduleLogic } from "@/use-logic/use-class-schedule.logic";
import { createContext, ReactNode, useContext } from "react";

// context/ClassScheduleContext.tsx
const ClassScheduleContext = createContext<
  ReturnType<typeof useClassScheduleLogic> | undefined
>(undefined);

export const ClassScheduleContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useClassScheduleLogic(); // formerly useClassScheduleForm
  return (
    <ClassScheduleContext.Provider value={value}>
      {children}
    </ClassScheduleContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useClassScheduleContext = () => {
  const ctx = useContext(ClassScheduleContext);
  if (!ctx)
    throw new Error(
      "useClassScheduleContext must be used within ClassScheduleProvider"
    );
  return ctx;
};
