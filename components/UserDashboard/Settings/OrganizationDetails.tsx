"use client";

import React, { useEffect, useState } from "react";
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
import { useAxios } from "@/Hooks/useAxiosInstance";

//========== Organization Details Component ==========
const OrganizationDetails: React.FC = () => {
  const axios = useAxios();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [organizationId, setOrganizationId] = useState<number | null>(null);

  const form = useForm<OrganizationForm>({
    defaultValues: {
      organizationName: "",
      abn: "",
      industry: "",
      companySize: undefined,
      streetAddress: "",
      city: "",
      state: "",
      postcode: "",
      organizationPhone: "",
      website: "",
      fiscalYearEnd: "",
    },
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const mapOrganizationToForm = (
    organization: Record<string, any>,
  ): OrganizationForm => ({
    organizationName: organization.organization_name || "",
    abn: organization.abn || "",
    industry: organization.industry || "",
    companySize:
      organization.company_size !== undefined &&
      organization.company_size !== null
        ? Number(organization.company_size)
        : undefined,
    streetAddress: organization.street_address || "",
    city: organization.city || "",
    state: organization.state || "",
    postcode: organization.post_code || "",
    organizationPhone: organization.phone || "",
    website: organization.website || "",
    fiscalYearEnd: organization.fiscal_year_end
      ? String(organization.fiscal_year_end).split("T")[0]
      : "",
  });

  const fetchOrganization = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/organization/");
      const payload = response.data?.data || response.data;
      const firstOrganization = Array.isArray(payload)
        ? payload[0]
        : Array.isArray(payload?.results)
          ? payload.results[0]
          : payload;

      if (firstOrganization) {
        setOrganizationId(firstOrganization.id ?? null);
        form.reset(mapOrganizationToForm(firstOrganization));
      }
    } catch (error) {
      console.error("Failed to load organization details", error);
      toastManager.add({
        title: "Error",
        description: "Could not load organization details.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //========== Handle Save ==========
  const handleSave = async (data: OrganizationForm) => {
    try {
      setIsSaving(true);

      const parsedCompanySize = Number(data.companySize);
      const payload = {
        organization_name: data.organizationName,
        abn: data.abn,
        industry: data.industry,
        company_size: Number.isFinite(parsedCompanySize)
          ? parsedCompanySize
          : 0,
        street_address: data.streetAddress,
        city: data.city,
        state: data.state,
        post_code: data.postcode,
        phone: data.organizationPhone,
        website: data.website,
        fiscal_year_end: data.fiscalYearEnd,
      };

      let response;
      if (organizationId) {
        response = await axios.put(`/organization/${organizationId}/`, payload);
      } else {
        response = await axios.post("/organization/", payload);
      }

      const savedOrganization = response.data?.data || response.data;
      if (savedOrganization?.id) {
        setOrganizationId(savedOrganization.id);
      }

      setIsEditing(false);
      toastManager.add({
        title: "Success",
        description: "Organization details updated successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to save organization details", error);
      toastManager.add({
        title: "Error",
        description: "Failed to update organization details.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
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
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <HiOutlinePencil className="w-4 h-4" />
            Edit
          </Button>
        ) : (
          <Button
            onClick={handleSubmit(handleSave)}
            disabled={isSaving}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <HiOutlineCheck className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save"}
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
                {...register("organizationName", {
                  required: "Organization name is required",
                })}
                disabled={!isEditing}
                className={`pl-10 ${errors.organizationName ? "border-red-500" : ""}`}
              />
            </div>
            {errors.organizationName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.organizationName.message}
              </p>
            )}
          </div>

          {/* ABN */}
          <div>
            <Label htmlFor="abn">ABN (Australian Business Number)</Label>
            <Input
              id="abn"
              {...register("abn", {
                required: "ABN is required",
                minLength: {
                  value: 9,
                  message: "ABN must be at least 9 characters",
                },
                maxLength: {
                  value: 20,
                  message: "ABN must be 20 characters or less",
                },
              })}
              disabled={!isEditing}
              className={`mt-1 ${errors.abn ? "border-red-500" : ""}`}
            />
            {errors.abn && (
              <p className="mt-1 text-xs text-red-600">{errors.abn.message}</p>
            )}
          </div>

          {/* Industry */}
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              {...register("industry", {
                required: "Industry is required",
              })}
              disabled={!isEditing}
              className={`mt-1 ${errors.industry ? "border-red-500" : ""}`}
            />
            {errors.industry && (
              <p className="mt-1 text-xs text-red-600">
                {errors.industry.message}
              </p>
            )}
          </div>

          {/* Company Size */}
          <div>
            <Label htmlFor="companySize">Company Size</Label>
            <Input
              id="companySize"
              type="number"
              min={1}
              step={1}
              {...register("companySize", {
                required: "Company size is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Company size must be at least 1",
                },
              })}
              disabled={!isEditing}
              className={`mt-1 ${errors.companySize ? "border-red-500" : ""}`}
            />
            {errors.companySize && (
              <p className="mt-1 text-xs text-red-600">
                {errors.companySize.message}
              </p>
            )}
          </div>

          {/* Street Address */}
          <div className="md:col-span-2">
            <Label htmlFor="streetAddress">Street Address</Label>
            <div className="relative mt-1">
              <HiOutlineMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="streetAddress"
                {...register("streetAddress", {
                  required: "Street address is required",
                })}
                disabled={!isEditing}
                className={`pl-10 ${errors.streetAddress ? "border-red-500" : ""}`}
              />
            </div>
            {errors.streetAddress && (
              <p className="mt-1 text-xs text-red-600">
                {errors.streetAddress.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register("city", {
                required: "City is required",
              })}
              disabled={!isEditing}
              className={`mt-1 ${errors.city ? "border-red-500" : ""}`}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>
            )}
          </div>

          {/* State */}
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              {...register("state", {
                required: "State is required",
              })}
              disabled={!isEditing}
              className={`mt-1 ${errors.state ? "border-red-500" : ""}`}
            />
            {errors.state && (
              <p className="mt-1 text-xs text-red-600">
                {errors.state.message}
              </p>
            )}
          </div>

          {/* Postcode */}
          <div>
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              id="postcode"
              {...register("postcode", {
                required: "Postcode is required",
                pattern: {
                  value: /^\d{4}$/,
                  message: "Postcode must be a 4-digit number",
                },
              })}
              disabled={!isEditing}
              className={`mt-1 ${errors.postcode ? "border-red-500" : ""}`}
            />
            {errors.postcode && (
              <p className="mt-1 text-xs text-red-600">
                {errors.postcode.message}
              </p>
            )}
          </div>

          {/* Organization Phone */}
          <div>
            <Label htmlFor="organizationPhone">Phone</Label>
            <div className="relative mt-1">
              <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="organizationPhone"
                {...register("organizationPhone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+()\-\s]{6,20}$/,
                    message: "Enter a valid phone number",
                  },
                })}
                disabled={!isEditing}
                className={`pl-10 ${errors.organizationPhone ? "border-red-500" : ""}`}
              />
            </div>
            {errors.organizationPhone && (
              <p className="mt-1 text-xs text-red-600">
                {errors.organizationPhone.message}
              </p>
            )}
          </div>

          {/* Website */}
          <div>
            <Label htmlFor="website">Website</Label>
            <div className="relative mt-1">
              <HiOutlineGlobeAlt className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="website"
                {...register("website", {
                  required: "Website is required",
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Website must start with http:// or https://",
                  },
                })}
                disabled={!isEditing}
                className={`pl-10 ${errors.website ? "border-red-500" : ""}`}
              />
            </div>
            {errors.website && (
              <p className="mt-1 text-xs text-red-600">
                {errors.website.message}
              </p>
            )}
          </div>

          {/* Fiscal Year End */}
          <div>
            <Label htmlFor="fiscalYearEnd">Fiscal Year End</Label>
            <div className="relative mt-1">
              <HiOutlineCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="fiscalYearEnd"
                type="date"
                {...register("fiscalYearEnd", {
                  required: "Fiscal year end date is required",
                })}
                disabled={!isEditing}
                className={`pl-10 ${errors.fiscalYearEnd ? "border-red-500" : ""}`}
              />
            </div>
            {errors.fiscalYearEnd && (
              <p className="mt-1 text-xs text-red-600">
                {errors.fiscalYearEnd.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrganizationDetails;
