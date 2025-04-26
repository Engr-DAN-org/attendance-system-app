import { createContext, useContext, ReactNode } from "react";
import { useSelectDataLogic } from "@/use-logic/use-select-data.logic";

const SelectDataContext = createContext<
  ReturnType<typeof useSelectDataLogic> | undefined
>(undefined);

export const SelectDataContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useSelectDataLogic();

  if (!value) {
    throw new Error(
      "useSelectDataLogic must return a valid value for SelectDataContextProvider"
    );
  }

  return (
    <SelectDataContext.Provider value={value}>
      {children}
    </SelectDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSelectDataContext = () => {
  const context = useContext(SelectDataContext);
  if (!context) {
    throw new Error(
      "useSelectDataContext must be used within a SelectDataContextProvider"
    );
  }
  return context;
};
