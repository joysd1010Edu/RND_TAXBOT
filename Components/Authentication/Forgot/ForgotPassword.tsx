"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import type {
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
} from "@/Type/Authentication/Forgot";
import Link from "next/link";
import Image from "next/image";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";

//========== Forgot Password Component ===========
const ForgotPassword = () => {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "verify" | "reset" | "success">(
    "email"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timer, setTimer] = useState(30);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const emailForm = useForm<ForgotPasswordFormValues>();
  const resetForm = useForm<ResetPasswordFormValues>();

  //========== Email Submit Handler ===========
  const onEmailSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      //========== Temporary Mock Implementation ===========
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setEmail(data.email);
      setStep("verify");
      startTimer();
    } catch (err) {
      setError("Failed to send verification code. Please try again.");
      console.error("Email error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  //========== Verification Code Handler ===========
  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const onVerifySubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const code = verificationCode.join("");
      if (code.length !== 4) {
        setError("Please enter all 4 digits");
        setIsLoading(false);
        return;
      }

      //========== Temporary Mock Implementation ===========
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStep("reset");
    } catch (err) {
      setError("Invalid verification code. Please try again.");
      console.error("Verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  //========== Reset Password Handler ===========
  const onResetSubmit = async (data: ResetPasswordFormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      //========== Temporary Mock Implementation ===========
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStep("success");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      console.error("Reset password error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  //========== Timer for Resend ===========
  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (timer > 0) return;

    try {
      setIsLoading(true);
      setError(null);

      //========== Temporary Mock Implementation ===========
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setVerificationCode(["", "", "", ""]);
      inputRefs[0].current?.focus();
      startTimer();
    } catch (err) {
      setError("Failed to resend code. Please try again.");
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

      {/*========= Right Side - Dynamic Content =========*/}
      <div className="w-full h-[50vh] sm:h-auto md:w-1/2 bg-linear-to-t from-[#05396B] to-[#064D8F] flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          {step === "email" && (
            <>
              {/*========= Header =========*/}
              <div className="mb-8 text-start">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Forgot Password?
                </h1>
                <p className="text-blue-200 text-sm md:text-base">
                  Enter your email for the verification proccess, we will send 4
                  digits code to your email.
                </p>
              </div>

              {/*========= Forgot Password Form =========*/}
              <form
                onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                className="space-y-5"
              >
                {/*========= Email Field =========*/}
                <div>
                  <div className="relative">
                    <span className="absolute z-10 inset-y-0 left-0 flex items-center pl-4 text-blue-50">
                      <FiMail size={20} />
                    </span>
                    <input
                      type="email"
                      placeholder="Email Address"
                      {...emailForm.register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-300/70 focus:border-transparent transition-all"
                    />
                  </div>
                  {emailForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-300">
                      {emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                {/*========= Error Message =========*/}
                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
                    {error}
                  </div>
                )}

                {/*========= Submit Button =========*/}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Continue"}
                </button>

                {/*========= Back to Login =========*/}
                <div className="text-center">
                  <Link
                    href="/Login"
                    className="text-blue-200 hover:text-white transition-colors text-sm"
                  >
                    ← Back to Login
                  </Link>
                </div>
              </form>
            </>
          )}

          {step === "verify" && (
            <>
              {/*========= Verification Header =========*/}
              <div className="mb-8 text-start">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Verification
                </h1>
                <p className="text-blue-200 text-sm md:text-base">
                  Enter your 4 digits code that you received on your email.
                </p>
              </div>

              {/*========= Verification Code Inputs =========*/}
              <div className="space-y-6">
                <div className="flex justify-center gap-3 md:gap-4">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-bold bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-300/70 focus:border-transparent transition-all"
                    />
                  ))}
                </div>

                {/*========= Timer =========*/}
                <div className="text-center text-blue-200 text-sm">
                  {timer > 0 ? `00:${timer.toString().padStart(2, "0")}` : ""}
                </div>

                {/*========= Error Message =========*/}
                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
                    {error}
                  </div>
                )}

                {/*========= Continue Button =========*/}
                <button
                  type="button"
                  onClick={onVerifySubmit}
                  disabled={isLoading || verificationCode.join("").length !== 4}
                  className="w-full py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Verifying..." : "Continue"}
                </button>

                {/*========= Resend Code =========*/}
                <div className="text-center text-sm">
                  <span className="text-blue-200">
                    If you didn't receive a code!{" "}
                  </span>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={timer > 0 || isLoading}
                    className="text-white font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Resend
                  </button>
                </div>
              </div>
            </>
          )}

          {step === "reset" && (
            <>
              {/*========= Reset Password Header =========*/}
              <div className="mb-8 text-start">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  New password
                </h1>
                <p className="text-blue-200 text-sm md:text-base">
                  Set the new password for your account so you can login and
                  access all features.
                </p>
              </div>

              {/*========= Reset Password Form =========*/}
              <form
                onSubmit={resetForm.handleSubmit(onResetSubmit)}
                className="space-y-5"
              >
                {/*========= New Password Field =========*/}
                <div>
                  <div className="relative">
                    <span className="absolute z-10 inset-y-0 left-0 flex items-center pl-4 text-blue-50">
                      <FiLock size={20} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      {...resetForm.register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-300/70 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-50 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  </div>
                  {resetForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-300">
                      {resetForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                {/*========= Confirm Password Field =========*/}
                <div>
                  <div className="relative">
                    <span className="absolute z-10 inset-y-0 left-0 flex items-center pl-4 text-blue-50">
                      <FiLock size={20} />
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      {...resetForm.register("confirmPassword", {
                        required: "Please confirm your password",
                      })}
                      className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-300/70 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-50 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  </div>
                  {resetForm.formState.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-300">
                      {resetForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/*========= Error Message =========*/}
                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
                    {error}
                  </div>
                )}

                {/*========= Update Password Button =========*/}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Updating..." : "Update password"}
                </button>
              </form>
            </>
          )}

          {step === "success" && (
            <>
              {/*========= Success Message =========*/}
              <div className="text-center">
                <div className="mb-6">
                  <BsCheckCircle className="w-20 h-20 mx-auto text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Successfully
                </h2>
                <p className="text-blue-200 mb-8">
                  Your password has been reset successfully.
                </p>
                <button
                  onClick={() => router.push("/Login")}
                  className="w-full py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Continue
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
