export interface CountryData {
  name: string;
  dialCode: string;
  countryCode: string;
}

export interface UserSignupData {
  email: string;
  password: string;
  agreedTermsAndConditions: boolean;
}
export interface UserSignInData {
  email: string;
  password: string;
}
