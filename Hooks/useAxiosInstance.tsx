"use client";

import { useContext } from "react";
import { AxiosContext } from "@/Hooks/useAxios";
import type { AxiosInstance } from "axios";

//========== Custom Hook to Access Axios Instance ===========
export const useAxios = (): AxiosInstance => {
  const axiosInstance = useContext(AxiosContext);

  if (!axiosInstance) {
    throw new Error("useAxios must be used within an AxiosProvider");
  }

  return axiosInstance;
};
