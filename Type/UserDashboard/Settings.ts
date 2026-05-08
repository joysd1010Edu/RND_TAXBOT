export interface SecurityForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface OrganizationForm {
  organizationName: string;
  abn: string;
  industry: string;
  companySize: number | undefined;
  streetAddress: string;
  city: string;
  state: string;
  postcode: string;
  organizationPhone: string;
  website: string;
  fiscalYearEnd: string;
}
