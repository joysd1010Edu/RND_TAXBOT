"use client";

import React, { useEffect, useState } from "react";
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
import { useAxios } from "@/Hooks/useAxiosInstance";

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
  const axios = useAxios();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<PersonalInfoForm>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      bio: "",
    },
  });

  const mapProfileToForm = (profile: Record<string, any>): PersonalInfoForm => ({
    fullName: profile.full_name || profile.name || "",
    email: profile.email || "",
    phone: profile.phone || "",
    position: profile.position || "",
    department: profile.department || "",
    bio: profile.bio || "",
  });

  const syncStoredUser = (fullName: string, email: string) => {
    [localStorage, sessionStorage].forEach((storage) => {
      const rawUser = storage.getItem("user");
      if (!rawUser) return;

      try {
        const user = JSON.parse(rawUser);
        const updatedUser = {
          ...user,
          full_name: fullName,
          email,
        };
        storage.setItem("user", JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Unable to sync profile data in storage", error);
      }
    });
  };

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/users/profile/");
      const profile = response.data?.data || response.data;
      if (profile) {
        form.reset(mapProfileToForm(profile));
      }
    } catch (error) {
      console.error("Failed to load profile", error);
      toastManager.add({
        title: "Error",
        description: "Could not load profile information.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //========== Handle Save ==========
  const handleSave = async (data: PersonalInfoForm) => {
    try {
      setIsSaving(true);
      const payload = {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        position: data.position,
        department: data.department,
        bio: data.bio,
      };

      await axios.put("/users/profile/", payload);
      syncStoredUser(data.fullName, data.email);
      setIsEditing(false);
      toastManager.add({
        title: "Success",
        description: "Personal information updated successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to update profile", error);
      toastManager.add({
        title: "Error",
        description: "Failed to update personal information.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
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
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <HiOutlinePencil className="w-4 h-4" />
            Edit
          </Button>
        ) : (
          <Button
            onClick={form.handleSubmit(handleSave)}
            disabled={isSaving}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <HiOutlineCheck className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save"}
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
