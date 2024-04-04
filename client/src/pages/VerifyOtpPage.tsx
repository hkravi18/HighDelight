import { useRef, useState } from 'react';

import { Button as ButtonTailwind } from "@material-tailwind/react";
import "../styles/VerifyOtpPage.css";

const Button: React.ForwardRefExoticComponent<any> = ButtonTailwind;

type OtpInputProps = {
  valueLength: number;
  onChange: (otp: string) => void;
  handleOtpVerification: () => void;
};

const VerifyOtpPage: React.FC<OtpInputProps> = ({ valueLength, onChange, handleOtpVerification }) => {
  const inputRefs = useRef<HTMLInputElement[]>(
    Array(valueLength).fill(null)
  );
  const [otp, setOtp] = useState<string[]>(Array(valueLength).fill(''));

  const handleTextChange = (input: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = input;
    setOtp(newOtp);
    if (newOtp.every((v) => v.length === 1)) {
      onChange(newOtp.join(''));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      if (newOtp[index].length === 0) {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
          newOtp.splice(index - 1, 2, '');
          setOtp(newOtp);
        }
      } else {
        newOtp[index] = newOtp[index].slice(0, -1);
        setOtp(newOtp);
      }
    }
  };

  return (
    <>
    <div className="otp-group">
      {otp.map((_, idx) => (
        <input
          key={idx}
          ref={(ref) => (inputRefs.current[idx] = ref!)}
          className="otp-input"
          type="text"
          value={otp[idx]}
          maxLength={1}
          onChange={(e) => handleTextChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onFocus={(e) => {
            const { target } = e;
            target.select();
          }}
        />
      ))}
    </div>
    <Button onClick={() => handleOtpVerification()}>Submit OTP</Button>
    </>
  );
};

export default VerifyOtpPage;