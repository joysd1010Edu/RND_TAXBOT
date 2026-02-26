"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { AddUserFormData } from "@/Type/AdminDashboard/UserManagement";

//========== Add User Form Props ==========
interface AddUserFormProps {
  onSubmit: (data: AddUserFormData) => void;
  onCancel: () => void;
}

//========== Add User Form Component ==========
const AddUserForm: React.FC<AddUserFormProps> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/*========== Email Field (Required) ==========*/}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/*========== Full Name Field (Required) ==========*/}
      <div className="space-y-2">
        <Label htmlFor="full_name">
          Full Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="full_name"
          type="text"
          placeholder="John Doe"
          {...register("full_name", {
            required: "Full name is required",
          })}
          aria-invalid={errors.full_name ? "true" : "false"}
        />
        {errors.full_name && (
          <p className="text-sm text-red-500">{errors.full_name.message}</p>
        )}
      </div>

      {/*========== Password Field (Required) ==========*/}
      <div className="space-y-2">
        <Label htmlFor="password">
          Password <span className="text-red-500">*</span>
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/*========== Confirm Password Field (Required) ==========*/}
      <div className="space-y-2">
        <Label htmlFor="confirm_password">
          Confirm Password <span className="text-red-500">*</span>
        </Label>
        <Input
          id="confirm_password"
          type="password"
          placeholder="Confirm password"
          {...register("confirm_password", {
            required: "Confirm password is required",
          })}
          aria-invalid={errors.confirm_password ? "true" : "false"}
        />
        {errors.confirm_password && (
          <p className="text-sm text-red-500">
            {errors.confirm_password.message}
          </p>
        )}
      </div>

      {/*========== Form Actions ==========*/}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add User"}
        </Button>
      </div>
    </form>
  );
};

export default AddUserForm;
