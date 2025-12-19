"use client";

import { createContext, useContext, useState } from "react";

interface ErrorPageContextType {
  isErrorPage: boolean;
  setIsErrorPage: (value: boolean) => void;
}

const ErrorPageContext = createContext<ErrorPageContextType | undefined>(
  undefined
);

//========== Error Page Provider ===========
export const ErrorPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isErrorPage, setIsErrorPage] = useState(false);

  return (
    <ErrorPageContext.Provider value={{ isErrorPage, setIsErrorPage }}>
      {children}
    </ErrorPageContext.Provider>
  );
};

//========== Hook to Use Error Page Context ===========
export const useErrorPage = () => {
  const context = useContext(ErrorPageContext);
  if (context === undefined) {
    throw new Error("useErrorPage must be used within ErrorPageProvider");
  }
  return context;
};
