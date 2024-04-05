export interface SignUpRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactMode: string;
}

export interface SignInRequestBody {
  email: string;
  password: string;
}

export interface SendOTPRequestBody {
  email: string;
}

export interface VerifyOTPRequestBody {
  email: string;
  otp: string;
}
