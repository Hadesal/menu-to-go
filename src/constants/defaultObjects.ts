import { UserDataType } from "@dataTypes/UserDataTypes";

export const defaultUserData: UserDataType = {
  id: "",
  name: "",
  email: "",
  createdAt: "",
  billingData: {
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    country: "",
    address: "",
    taxId: "",
    city: "",
    zipCode: "",
  },
  currency: "",
  qrCodeStyle: undefined,
  verified: false,
};
