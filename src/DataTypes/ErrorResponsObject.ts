export interface ErrorResponseObject {
  details: string;
  message: string;
  status: number;
  timestamp: string;
}

export interface AxiosErrorResponseData {
  message?: string;
  details?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
