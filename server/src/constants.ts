const DB_NAME = "highwayDelight";

// otp expiry time in minutes
const OTP_EXPIRY_TIME = 10;

const OTP_MAIL_TEMPLATE = (otp: string): string => {
  return `
    <h2>Hi!</h2>
    <h1>Welcome to <span style="color:blue;">Highway Delight</span>.</h1>
    <p>Your OTP is: <strong>${otp}</strong>.</p>
    <p>Please use this OTP to verify your email address.</p>
    <p>The OTP is valid for <strong>${OTP_EXPIRY_TIME} minutes</strong>.<br></p>
    Regards,
    <h4>DEP_P06_2024</h4>`;
};

export { DB_NAME, OTP_MAIL_TEMPLATE, OTP_EXPIRY_TIME };
