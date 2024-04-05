import {
  Input as InputTailwind,
  Button as ButtonTailwind,
  Card as CardTailwind,
  CardHeader as CardHeaderTailwind,
  CardBody as CardBodyTailwind,
  CardFooter as CardFooterTailwind,
  Typography as TypographyTailwind,
} from "@material-tailwind/react";

import "../styles/VerifyOtpPage.css";

const Input: React.ForwardRefExoticComponent<any> = InputTailwind;
const Button: React.ForwardRefExoticComponent<any> = ButtonTailwind;
const Card: React.ForwardRefExoticComponent<any> = CardTailwind;
const CardHeader: React.ForwardRefExoticComponent<any> = CardHeaderTailwind;
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

const validateChar = (char: string) => /^[0-9]{0,6}$/.test(char);

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
      alert(`OTP should contains only ${valueLength} characters`);
      return;
    }

    if (!validateChar(str)) {
      alert("OTP should contains numeric characters only");
      return;
    }

    setOtp(str);
  };

  const handleResendOTP = () => {
    setOtp("");
    handleOTPStart();
  };

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Verify OTP
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Typography color="blue-gray" className="-mb-2 ml-2 font-medium">
              OTP<span className="text-red-800">*</span> :
            </Typography>
            <Input
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
              onClick={handleOtpVerification}
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
