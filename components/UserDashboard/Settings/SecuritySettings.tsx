"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineKey, HiOutlinePencil, HiOutlineCheck } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toastManager } from "@/components/ui/toast";
import { SecurityForm } from "@/Type/UserDashboard/Settings";

//========== Security Settings Component ==========
const SecuritySettings: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<SecurityForm>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  //========== Handle Save ==========
  const handleSave = (data: SecurityForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toastManager.add({
        title: "Error",
        description: "Passwords do not match!",
        type: "error",
      });
      return;
    }
    console.log("Security Update:", { password: data.newPassword });
    form.reset();
    setIsEditing(false);
    toastManager.add({
      title: "Success",
      description: "Password updated successfully.",
      type: "success",
    });
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
          {/* New Password */}
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              {...form.register("newPassword")}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...form.register("confirmPassword")}
              disabled={!isEditing}
              className="mt-1"
            />
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
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <HiOutlineCheck className="w-4 h-4" />
              Update Password
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SecuritySettings;
