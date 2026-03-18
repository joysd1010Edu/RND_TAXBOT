"use client";

import React, { type ReactNode, useMemo } from "react";
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { AxiosContext } from "@/Hooks/useAxios";

interface AxiosProviderProps {
  children: ReactNode;
  baseURL?: string;
}

//========== Type for requests with retry flag ===========
interface ExtendedInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

//========== Axios Provider Component ===========
export const AxiosProvider: React.FC<AxiosProviderProps> = ({
  children,
  baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://31.97.145.112/api/",
}) => {
  //========== Track document visibility ===========
  const isTabActiveRef = React.useRef(true);

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  //========== Create Axios Instance (memoized to prevent infinite re-renders) ===========
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL,
      timeout: 60000,
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
    });

    //========== Request Interceptor ===========
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const isNonCriticalRequest =
          config.url?.includes("/notifications") ||
          config.url?.includes("/activity");

        if (!isTabActiveRef.current && isNonCriticalRequest) {
          const source = axios.CancelToken.source();
          config.cancelToken = source.token;

          setTimeout(() => {
            if (!isTabActiveRef.current) {
              source.cancel("Request canceled - tab in background");
            }
          }, 1000);
        }

        const token =
          localStorage.getItem("accessToken") ||
          sessionStorage.getItem("accessToken");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        if (process.env.NODE_ENV === "development") {
          console.log(
            `API Request: ${config.method?.toUpperCase()} ${config.baseURL}${
              config.url
            }`,
          );
        }

        return config;
      },
      (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
      },
    );

    //========== Response Interceptor ===========
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (process.env.NODE_ENV === "development") {
          console.log(
            `API Response: ${response.config.method?.toUpperCase()} ${
              response.config.url
            } - Status: ${response.status}`,
          );
        }
        return response;
      },
      async (error: {
        config: ExtendedInternalAxiosRequestConfig;
        response?: { status: number };
        code?: string;
        message?: string;
      }) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
          return Promise.reject(error);
        }

        if (error.code === "ECONNABORTED") {
          console.log("Request timed out. Tab may be in background.");
          return Promise.reject(error);
        }

        if (error.response) {
          console.error(
            `API Error: ${error.config?.method?.toUpperCase()} ${
              error.config?.url
            } - Status: ${error.response.status}`,
          );

          //========== Handle 401 Unauthorized ===========
          if (error.response.status === 401) {
            if (error.config._retry) {
              console.log("Already tried to refresh token, logging out");
              localStorage.removeItem("user");
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("accessToken");
              sessionStorage.removeItem("refreshToken");
              document.cookie =
                "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
              document.cookie =
                "userData=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
              window.location.href = "/Login";
              return Promise.reject(error);
            }

            const refreshToken =
              localStorage.getItem("refreshToken") ||
              sessionStorage.getItem("refreshToken");

            if (!refreshToken) {
              console.log("No refresh token available, logging out");
              localStorage.removeItem("user");
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("accessToken");
              sessionStorage.removeItem("refreshToken");
              document.cookie =
                "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
              document.cookie =
                "userData=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
              window.location.href = "/Login";
              return Promise.reject(error);
            }

            try {
              error.config._retry = true;

              if (
                !isTabActiveRef.current &&
                !error.config.url?.includes("/auth/")
              ) {
                console.log("Tab in background, skipping token refresh");
                return Promise.reject(error);
              }

              const response = await axios.post(
                `${baseURL}/users/refresh-token`,
                { token: refreshToken },
                {
                  timeout: 5000,
                  headers: { "Content-Type": "application/json" },
                },
              );

              if (response.status === 200 && response.data.accessToken) {
                console.log("Refresh Token Successful");
                const {
                  accessToken,
                  refreshToken: newRefreshToken,
                  user,
                } = response.data;

                const storage =
                  localStorage.getItem("rememberMe") === "true"
                    ? localStorage
                    : sessionStorage;
                storage.setItem("accessToken", accessToken);
                storage.setItem("refreshToken", newRefreshToken);
                storage.setItem("user", JSON.stringify(user));

                error.config.headers.Authorization = `Bearer ${accessToken}`;
                return axios.request(error.config);
              } else {
                throw new Error("Invalid refresh token response");
              }
            } catch (refreshError) {
              console.log("Refresh Token Failed", refreshError);
              localStorage.removeItem("user");
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("accessToken");
              sessionStorage.removeItem("refreshToken");
              window.location.href = "/Login";
              return Promise.reject(error);
            }
          }
        } else {
          console.error("Network Error:", error.message);
        }

        return Promise.reject(error);
      },
    );

    return instance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseURL]);

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};
