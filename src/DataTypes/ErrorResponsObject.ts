export interface ErrorResponseObject {
  status: number;
  message: string;
  details: string;
  timestamp: Date;
  errors: { name: string };
}
