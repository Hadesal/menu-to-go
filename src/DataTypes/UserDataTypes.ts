import { QrCodeStyleDataType } from "./QrStyleDataType";

export interface CountryDataType {
  name: string;
  dialCode: string;
  countryCode: string;
}

export interface BillingDataType {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  companyName?: string;
  country?: string;
  address?: string;
  taxId?: string;
  city?: string;
  zipCode?: string;
}

export interface UserSignupDataType {
  name: string;
  email: string;
  password: string;
  agreedTermsAndConditions: boolean;
}

export interface UserSignInDataType {
  email: string;
  password: string;
}

export interface UserDataType {
  id: string;
  name: string;
  email: string;
  password?: string;
  billingData?: BillingDataType;
  currency?: string;
  qrCodeStyle?: QrCodeStyleDataType;
  verified?: boolean;
  createdAt: string;
}

export interface UpdatePasswordDataType {
  currentPassword: string;
  newPassword: string;
}

export interface UserStateDataType {
  userList: UserDataType[];
  loading: boolean;
  error: string | null;
  message: string | null;
}
