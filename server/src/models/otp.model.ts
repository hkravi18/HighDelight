import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      regex: /^\S+@\S+\.\S+$/,
    },
    otp: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
