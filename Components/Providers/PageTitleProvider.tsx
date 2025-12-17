"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PageTitleContextType {
  pageTitle: string;
  setPageTitle: (title: string) => void;
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(
  undefined
);

//========== Page Title Provider ===========
export const PageTitleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pageTitle, setPageTitle] = useState("Dashboard");

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

//========== Hook to Use Page Title Context ===========
export const usePageTitle = () => {
  const context = useContext(PageTitleContext);
  if (context === undefined) {
    throw new Error("usePageTitle must be used within PageTitleProvider");
  }
  return context;
};
