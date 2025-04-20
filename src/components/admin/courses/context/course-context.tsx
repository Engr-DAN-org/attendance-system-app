import { useCourseLogic } from "@/use-logic/use-course.logic";
import { createContext, ReactNode, useContext } from "react";

// context/CourseContext.tsx
const CourseContext = createContext<
  ReturnType<typeof useCourseLogic> | undefined
>(undefined);

export const CourseContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useCourseLogic(); // formerly useCourseForm
  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCourseContext = () => {
  const ctx = useContext(CourseContext);
  if (!ctx)
    throw new Error("useCourseContext must be used within CourseProvider");
  return ctx;
};
