export interface SecurityForm {
  newPassword: string;
  confirmPassword: string;
}

export interface OrganizationForm {
  organizationName: string;
  abn: string;
  industry: string;
  companySize: string;
  streetAddress: string;
  city: string;
  state: string;
  postcode: string;
  organizationPhone: string;
  website: string;
  fiscalYearEnd: string;
}