"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlinePencil,
  HiOutlineCheck,
} from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toastManager } from "@/components/ui/toast";

//========== Type Definitions ==========
interface PersonalInfoForm {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  bio: string;
}

//========== Personal Information Component ==========
const PersonalInformation: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<PersonalInfoForm>({
    defaultValues: {
      fullName: "John Smith",
      email: "john@techcorp.com",
      phone: "+61 4XX XXX XXX",
      position: "R&D Manager",
      department: "Research & Development",
      bio: "",
    },
  });

  //========== Handle Save ==========
  const handleSave = (data: PersonalInfoForm) => {
    console.log("Personal Information:", data);
    setIsEditing(false);
    toastManager.add({
      title: "Success",
      description: "Personal information updated successfully.",
      type: "success",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      {/*========== Header ==========*/}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <HiOutlineUser className="w-6 h-6" />
            Personal Information
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Update your personal details and profile information
          </p>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <HiOutlinePencil className="w-4 h-4" />
            Edit
          </Button>
        ) : (
          <Button
            onClick={form.handleSubmit(handleSave)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <HiOutlineCheck className="w-4 h-4" />
            Save
          </Button>
        )}
      </div>

      {/*========== Form Fields ==========*/}
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              {...form.register("fullName")}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative mt-1">
              <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phone"
                {...form.register("phone")}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          {/* Position */}
          <div>
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              {...form.register("position")}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          {/* Department */}
          <div className="md:col-span-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              {...form.register("department")}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...form.register("bio")}
              disabled={!isEditing}
              className="mt-1 min-h-30"
              placeholder=""
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
