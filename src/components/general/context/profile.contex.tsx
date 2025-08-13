import { useProfileLogic } from "@/use-logic/use-profile.logic";
import { createContext, ReactNode, useContext } from "react";

// context/ProfileContext.tsx
const ProfileContext = createContext<
  ReturnType<typeof useProfileLogic> | undefined
>(undefined);

export const ProfileContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useProfileLogic(); // formerly useCourseForm
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfileContext = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx)
    throw new Error("useProfileContext must be used within ProfileProvider");
  return ctx;
};
