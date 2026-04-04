"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineKey,
  HiOutlinePencil,
  HiOutlineCheck,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toastManager } from "@/components/ui/toast";
import { SecurityForm } from "@/Type/UserDashboard/Settings";
import { useAxios } from "@/Hooks/useAxiosInstance";

//========== Security Settings Component ==========
const SecuritySettings: React.FC = () => {
  const axios = useAxios();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SecurityForm>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  //========== Handle Save ==========
  const handleSave = async (data: SecurityForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toastManager.add({
        title: "Error",
        description: "Passwords do not match!",
        type: "error",
      });
      return;
    }

    if (!data.currentPassword) {
      toastManager.add({
        title: "Error",
        description: "Current password is required.",
        type: "error",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post("/users/change-password/", {
        current_password: data.currentPassword,
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      });

      form.reset();
      setIsEditing(false);
      toastManager.add({
        title: "Success",
        description: "Password updated successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to change password", error);
      toastManager.add({
        title: "Error",
        description: "Failed to update password. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  //========== Handle Generate Password ==========
  const handleGeneratePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 16; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    form.setValue("newPassword", password);
    form.setValue("confirmPassword", password);
    toastManager.add({
      title: "Password Generated",
      description: "A strong password has been generated for you.",
      type: "success",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <HiOutlineKey className="w-6 h-6" />
            Security
          </h2>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <HiOutlinePencil className="w-4 h-4" />
            Edit
          </Button>
        )}
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Password */}
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative mt-1">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                {...form.register("currentPassword")}
                disabled={!isEditing}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                disabled={!isEditing}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={showCurrentPassword ? "Hide password" : "Show password"}
              >
                {showCurrentPassword ? (
                  <HiOutlineEyeSlash className="w-5 h-5" />
                ) : (
                  <HiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative mt-1">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                {...form.register("newPassword")}
                disabled={!isEditing}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                disabled={!isEditing}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <HiOutlineEyeSlash className="w-5 h-5" />
                ) : (
                  <HiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative mt-1">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...form.register("confirmPassword")}
                disabled={!isEditing}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                disabled={!isEditing}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <HiOutlineEyeSlash className="w-5 h-5" />
                ) : (
                  <HiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              onClick={handleGeneratePassword}
              variant="outline"
              className="flex items-center gap-2"
            >
              <HiOutlineKey className="w-4 h-4" />
              Generate Strong Password
            </Button>
            <Button
              type="button"
              onClick={form.handleSubmit(handleSave)}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <HiOutlineCheck className="w-4 h-4" />
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SecuritySettings;
