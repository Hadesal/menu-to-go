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
