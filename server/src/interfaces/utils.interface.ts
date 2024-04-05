export interface HandleValidation {
  valid: boolean;
  message: string;
  error: string;
}

export interface HandleJWTPayload {
  email: string;
}

export interface HandleOTPGeneration {
  otp: string;
  expiry: Date;
}
