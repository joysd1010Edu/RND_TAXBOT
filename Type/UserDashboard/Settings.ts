export interface SecurityForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface OrganizationForm {
  organization_name: string;
  abn: string;
  industry: string;
  company_size: number | undefined;
  street_address: string;
  city: string;
  state: string;
  post_code: string;
  phone: string;
  website: string;
  fiscal_year_end: string;
}
