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
  name: string;
  email: string;
  password: string;
}

export interface ChangePasswordDataType {
  oldPassword: String;
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
