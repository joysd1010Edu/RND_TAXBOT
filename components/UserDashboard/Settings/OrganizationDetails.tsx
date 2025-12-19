"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineBuildingOffice2,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineGlobeAlt,
  HiOutlineCalendar,
  HiOutlinePencil,
  HiOutlineCheck,
} from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toastManager } from "@/components/ui/toast";
import { OrganizationForm } from "@/Type/UserDashboard/Settings";


//========== Organization Details Component ==========
const OrganizationDetails: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<OrganizationForm>({
    defaultValues: {
      organizationName: "Tech Corp Australia",
      abn: "12 345 678 901",
      industry: "",
      companySize: "",
      streetAddress: "123 Innovation Street",
      city: "Sydney",
      state: "",
      postcode: "2000",
      organizationPhone: "+61 2 9XXX XXXX",
      website: "www.techcorp.com.au",
      fiscalYearEnd: "",
    },
  });

  //========== Handle Save ==========
  const handleSave = (data: OrganizationForm) => {
    console.log("Organization Details:", data);
    setIsEditing(false);
    toastManager.add({
      title: "Success",
      description: "Organization details updated successfully.",
      type: "success",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <HiOutlineBuildingOffice2 className="w-6 h-6" />
            Organization Details
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage your organization information and R&D registration
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

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Organization Name */}
          <div>
            <Label htmlFor="organizationName">Organization Name</Label>
            <div className="relative mt-1">
              <HiOutlineBuildingOffice2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="organizationName"
                {...form.register("organizationName")}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          {/* ABN */}
          <div>
            <Label htmlFor="abn">ABN (Australian Business Number)</Label>
            <Input
              id="abn"
              {...form.register("abn")}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          {/* Industry */}
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              {...form.register("industry")}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          {/* Company Size */}
          <div>
            <Label htmlFor="companySize">Company Size</Label>
            <Input
              id="companySize"
              {...form.register("companySize")}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          {/* Street Address */}
          <div className="md:col-span-2">
            <Label htmlFor="streetAddress">Street Address</Label>
            <div className="relative mt-1">
              <HiOutlineMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="streetAddress"
                {...form.register("streetAddress")}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...form.register("city")}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          {/* State */}
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              {...form.register("state")}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          {/* Postcode */}
          <div>
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              id="postcode"
              {...form.register("postcode")}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          {/* Organization Phone */}
          <div>
            <Label htmlFor="organizationPhone">Phone</Label>
            <div className="relative mt-1">
              <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="organizationPhone"
                {...form.register("organizationPhone")}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <Label htmlFor="website">Website</Label>
            <div className="relative mt-1">
              <HiOutlineGlobeAlt className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="website"
                {...form.register("website")}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          {/* Fiscal Year End */}
          <div>
            <Label htmlFor="fiscalYearEnd">Fiscal Year End</Label>
            <div className="relative mt-1">
              <HiOutlineCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="fiscalYearEnd"
                type="date"
                {...form.register("fiscalYearEnd")}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrganizationDetails;
