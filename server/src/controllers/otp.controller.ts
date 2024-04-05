import { Request, Response } from "express";

//models
import User from "../models/user.model";
import Otp from "../models/otp.model";

//lib
import sendMail from "../lib/sendMail";

//interfaces
import { SendMailHandler } from "../interfaces/lib.interface";
import {
  SendOTPRequestBody,
  VerifyOTPRequestBody,
} from "../interfaces/request.interface";

//constants
import { OTP_MAIL_TEMPLATE } from "../constants";

//utils
import generateOtp from "../utils/handleOTP";

// @desc     Send OTP
// route     POST /api/auth/otp/send
// @access   Public
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email }: SendOTPRequestBody = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({
        ok: false,
        error: "User already exists, Please Login",
        data: {},
      });
    }

    const { otp, expiry } = generateOtp();
    console.log(otp);

    //putting otp in the otp verification model
    const otpInfo = await Otp.findOneAndUpdate(
      {
        email: email,
      },
      {
        otp,
        expiry,
      },
      {
        upsert: true,
        new: true,
      }
    );
    console.log(otpInfo);

    if (!otpInfo) {
      return res.status(500).json({
        ok: false,
        error: "OTP generation failed",
        data: {},
      });
    }

    const mailTemplate = OTP_MAIL_TEMPLATE(otp);
    const mailOptions: SendMailHandler = {
      from: process.env.USER_EMAIL as string,
      to: email,
      subject: "Highway Delight - OTP Verification",
      html: mailTemplate,
      text: "",
    };

    const sendMailRes = await sendMail(mailOptions);

    if (sendMailRes) {
      return res.status(200).json({
        ok: true,
        message: "OTP sent successfully",
        data: {
          email: email,
        },
      });
    } else {
      return res.status(500).json({
        ok: false,
        message: "OTP sending failed",
        data: {},
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`ERROR (send-otp): ${err.message}`);
    }
    return res.status(500).json({
      ok: false,
      message: "OTP sending failed",
      data: {},
    });
  }
};

// @desc     Verify OTP
// route     POST /api/auth/otp/verify
// @access   Public
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp }: VerifyOTPRequestBody = req.body;

    const otpInfo = await Otp.findOne({ email });

    if (!otpInfo) {
      return res.status(404).json({
        ok: false,
        data: {},
        error: "No OTP found. Please try again later",
      });
    }

    const now = new Date();
    if (otpInfo && otpInfo?.expiry < now) {
      return res.status(400).json({
        ok: false,
        data: {},
        error: "OTP expired, Please try again",
      });
    }

    if (otpInfo && otpInfo.otp !== otp) {
      return res.status(401).json({
        ok: false,
        data: {},
        error: "OTP invalid",
      });
    }

    //deleting the record of the user from otp verification model
    await Otp.deleteOne({
      email,
    });

    return res.status(200).json({
      ok: true,
      message: "OTP verified successfully",
      data: {
        email,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(`ERROR (verify-otp): ${err.message}`);
    }
    return res.status(500).json({
      ok: false,
      message: "OTP verification failed",
      data: {},
    });
  }
};
