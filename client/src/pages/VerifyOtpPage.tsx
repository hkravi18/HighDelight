import {
  Input as InputTailwind,
  Button as ButtonTailwind,
  Card as CardTailwind,
  CardBody as CardBodyTailwind,
  CardFooter as CardFooterTailwind,
  Typography as TypographyTailwind,
} from "@material-tailwind/react";

import "../styles/VerifyOtpPage.css";
import { toast } from "sonner";

const Input: React.ForwardRefExoticComponent<any> = InputTailwind;
const Button: React.ForwardRefExoticComponent<any> = ButtonTailwind;
const Card: React.ForwardRefExoticComponent<any> = CardTailwind;
const CardBody: React.ForwardRefExoticComponent<any> = CardBodyTailwind;
const CardFooter: React.ForwardRefExoticComponent<any> = CardFooterTailwind;
const Typography: React.ForwardRefExoticComponent<any> = TypographyTailwind;

type OtpInputProps = {
  otp: string;
  valueLength: number;
  setOtp: (otp: string) => void;
  handleOtpVerification: () => void;
  handleOTPStart: () => void;
};

const validateOTP = (otp: string) => /^[0-9]{0,6}$/.test(otp);

const VerifyOtpPage: React.FC<OtpInputProps> = ({
  otp,
  valueLength,
  setOtp,
  handleOtpVerification,
  handleOTPStart,
}: OtpInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str: string = e.target.value;

    if (str.length > valueLength) {
      // alert(`OTP should contains only ${valueLength} characters`);
      toast.error(`OTP should contains only ${valueLength} characters`);
      return;
    }

    setOtp(str);
  };

  const handleResendOTP = () => {
    setOtp("");
    handleOTPStart();
  };

  const submitOTP = () => {
    if (otp === "") {
      // alert("OTP is required");
      toast.error("OTP is required, Please enter OTP");
      return;
    }

    if (!validateOTP(otp)) {
      // alert("OTP should contains numeric characters only");
      toast.error(
        "OTP should contains numeric characters only, Please enter valid OTP"
      );
      return;
    }
    handleOtpVerification();
  };

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <Card className="w-96 verify-otp-container">
          <h3 className="otp-title">Verify OTP</h3>
          <CardBody className="flex flex-col gap-4">
            <Input
              variant="standard"
              label="Enter your Otp"
              size="lg"
              type="number"
              name="otp"
              value={otp}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              fullWidth
              onClick={() => submitOTP()}
              style={{
                background: "linear-gradient(to right, #3a244a, #3a244a)",
                padding: "10px",
                textTransform: "none",
                fontSize: "14px",
              }}
            >
              Verify OTP
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Didn't receive OTP?
              <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold cursor-pointer"
                onClick={handleResendOTP}
              >
                Resend OTP
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default VerifyOtpPage;
