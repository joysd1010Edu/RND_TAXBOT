"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/components/Providers/AuthProvider";
import type { loginFormValues } from "@/Type/Authentication/Login";
import Link from "next/link";
import Image from "next/image";
import { FiLock, FiMail } from "react-icons/fi";
import { toastManager } from "@/components/ui/toast";

//========== Login Component ===========
const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userLoggedIn = localStorage.getItem("accessToken");

  //========== React Hook Form Setup ===========
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormValues>();

  //========== Form Submit Handler ===========
  const onSubmit = async (data: loginFormValues) => {
    try {
      if (userLoggedIn) {
        toastManager.add({
          description: "Redirecting to dashboard...",
          title: "Already logged in",
          type: "info",
        });

        setTimeout(() => {
          toastManager.add({
            description: "Welcome back to your dashboard",
            title: "Redirected successfully",
            type: "success",
          });
          window.location.href = "/";
        }, 2000);

        return;
      }
      setIsLoading(true);
      setError(null);
      await login(data.email, data.password);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/*========= Left Side - Logo =========*/}
      <div className="w-full h-[50vh] sm:h-auto md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <Image
            src="/logo.png"
            alt="PATTENS Logo"
            width={300}
            height={200}
            className="w-64 md:w-80 mx-auto"
            priority
          />
        </div>
      </div>

      {/*========= Right Side - Login Form =========*/}
      <div className="w-full h-[50vh] sm:h-auto md:w-1/2 bg-linear-to-b from-[#064D8F] to-[#05396B] flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          {/*========= Welcome Header =========*/}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome to <span className="text-orange-400 italic">PATTENS</span>
            </h1>
            <p className="text-blue-200 text-sm md:text-base">
              Please login to continue
            </p>
          </div>

          {/*========= Login Form =========*/}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/*========= Email Field =========*/}
            <div>
              <div className="relative">
                <span className="absolute z-10 inset-y-0 left-0 flex items-center pl-4 text-blue-50">
                  <FiMail size={20} />
                </span>
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-300/70 focus:border-transparent transition-all"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-300">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/*========= Password Field =========*/}
            <div>
              <div className="relative">
                <span className="absolute z-10 inset-y-0 left-0 flex items-center pl-4 text-blue-50">
                  <FiLock size={20} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-lg text-white  placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-300/70 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-300 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-300">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link
                href="/Forgot"
                className="text-blue-200 hover:text-white transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/*========= Error Message =========*/}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            {/*========= Login Button =========*/}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
