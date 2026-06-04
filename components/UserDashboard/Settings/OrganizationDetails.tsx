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

const ORGANIZATION_DEFAULT_VALUES: OrganizationForm = {
  organization_name: "",
  abn: "",
  industry: "",
  company_size: undefined,
  street_address: "",
  city: "",
  state: "",
  post_code: "",
  phone: "",
  website: "",
  fiscal_year_end: "",
};

//========== Organization Details Component ==========
const OrganizationDetails: React.FC = () => {
  const axios = useAxios();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [organizationId, setOrganizationId] = useState<number | null>(null);

  const form = useForm<OrganizationForm>({
    defaultValues: ORGANIZATION_DEFAULT_VALUES,
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
    organization_name:
      organization.organization_name || organization.company || "",
    abn: organization.abn || "",
    industry: organization.industry || "",
    company_size:
      organization.company_size !== undefined &&
      organization.company_size !== null
        ? Number(organization.company_size)
        : undefined,
    street_address: organization.street_address || "",
    city: organization.city || "",
    state: organization.state || "",
    post_code: organization.post_code || "",
    phone: organization.phone || "",
    website: organization.website || "",
    fiscal_year_end: organization.fiscal_year_end
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

      const payload = {
        organization_name: data.organization_name,
        abn: data.abn,
        industry: data.industry,
        company_size: Number.isFinite(Number(data.company_size))
          ? Number(data.company_size)
          : 0,
        street_address: data.street_address,
        city: data.city,
        state: data.state,
        post_code: data.post_code,
        phone: data.phone,
        website: data.website,
        fiscal_year_end: data.fiscal_year_end,
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
            <Label htmlFor="organization_name">Organization Name</Label>
            <div className="relative mt-1">
              <HiOutlineBuildingOffice2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="organization_name"
                {...register("organization_name", {
                  required: "Organization name is required",
                })}
                disabled={!isEditing}
                className={`pl-10 ${errors.organization_name ? "border-red-500" : ""}`}
              />
            </div>
            {errors.organization_name && (
              <p className="mt-1 text-xs text-red-600">
                {errors.organization_name.message}
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
            <Label htmlFor="company_size">Company Size</Label>
            <Input
              id="company_size"
              type="number"
              min={1}
              step={1}
              {...register("company_size", {
                required: "Company size is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Company size must be at least 1",
                },
              })}
              disabled={!isEditing}
              className={`mt-1 ${errors.company_size ? "border-red-500" : ""}`}
            />
            {errors.company_size && (
              <p className="mt-1 text-xs text-red-600">
                {errors.company_size.message}
              </p>
            )}
          </div>

          {/* Street Address */}
          <div className="md:col-span-2">
            <Label htmlFor="street_address">Street Address</Label>
            <div className="relative mt-1">
              <HiOutlineMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="street_address"
                {...register("street_address", {
                  required: "Street address is required",
                })}
                disabled={!isEditing}
                className={`pl-10 ${errors.street_address ? "border-red-500" : ""}`}
              />
            </div>
            {errors.street_address && (
              <p className="mt-1 text-xs text-red-600">
                {errors.street_address.message}
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
            <Label htmlFor="post_code">Postcode</Label>
            <Input
              id="post_code"
              {...register("post_code", {
                required: "Postcode is required",
                pattern: {
                  value: /^\d{4}$/,
                  message: "Postcode must be a 4-digit number",
                },
              })}
              disabled={!isEditing}
              className={`mt-1 ${errors.post_code ? "border-red-500" : ""}`}
            />
            {errors.post_code && (
              <p className="mt-1 text-xs text-red-600">
                {errors.post_code.message}
              </p>
            )}
          </div>

          {/* Organization Phone */}
          <div>
            <Label htmlFor="phone">Phone</Label>
            <div className="relative mt-1">
              <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+()\-\s]{6,20}$/,
                    message: "Enter a valid phone number",
                  },
                })}
                disabled={!isEditing}
                className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">
                {errors.phone.message}
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
            <Label htmlFor="fiscal_year_end">Fiscal Year End</Label>
            <div className="relative mt-1">
              <HiOutlineCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="fiscal_year_end"
                type="date"
                {...register("fiscal_year_end", {
                  required: "Fiscal year end date is required",
                })}
                disabled={!isEditing}
                className={`pl-10 ${errors.fiscal_year_end ? "border-red-500" : ""}`}
              />
            </div>
            {errors.fiscal_year_end && (
              <p className="mt-1 text-xs text-red-600">
                {errors.fiscal_year_end.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrganizationDetails;
