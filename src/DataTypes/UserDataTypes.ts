export interface CountryData {
  name: String;
  dialCode: String;
  countryCode: String;
}

export interface UserSignupData {
  name: String;
  email: String;
  password: String;
  agreedTermsAndConditions: boolean;
}
export interface UserSignupApiData {
  name: String;
  email: String;
  password: String;
}
export interface UserSignInData {
  email: String;
  password: String;
}
export interface UserUpdateData {
  id: String;
  name: String;
  email: String;
  password: String;
  image?: String;
  billingData?: BillingDataType;
  currency?: String;
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
