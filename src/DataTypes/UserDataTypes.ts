export interface CountryData {
  name: string;
  dialCode: string;
  countryCode: string;
}

export interface UserSignupData {
  name: string;
  email: string;
  password: string;
  agreedTermsAndConditions: boolean;
}

export interface UserSignupApiData {
  name: string;
  email: string;
  password: string;
}

export interface UserSignInData {
  email: string;
  password: string;
}

export interface UserUpdateData {
  id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  billingData?: BillingDataType;
  currency?: string;
}

export interface ChangePasswordDataType {
  currentPassword: string;
  newPassword: string;
}

export interface BillingDataType {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  country: string;
  address: string;
  taxId: string;
  city: string;
  zipCode: string;
}

export interface UpdatePasswordDataType {
  currentPassword: string;
  newPassword: string;
}
