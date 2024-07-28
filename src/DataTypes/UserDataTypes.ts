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
  id: String;
  name: string;
  email: string;
  password: string;
  image?: String;
  billingData?: BillingDataType;
}

export interface ChangePasswordDataType {
  currentPassword: String;
  newPassword: String;
}

export interface BillingDataType {
  fullName: String;
  email: String;
  phoneNumber: String;
  companyName: String;
  country: String;
  address: String;
  taxId: String;
  city: String;
  zipCode: String;
}

export interface UpdatePasswordDataType {
  currentPassword: String;
  newPassword: String;
}
