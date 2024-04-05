import { OTP_EXPIRY_TIME } from "../constants";
import { HandleOTPGeneration } from "../interfaces/utils.interface";

const generateOtp = (): HandleOTPGeneration => {
  const otp: string = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry: Date = new Date();

  expiry.setMinutes(expiry.getMinutes() + OTP_EXPIRY_TIME);
  return { otp, expiry };
};

export default generateOtp;
