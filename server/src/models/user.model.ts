import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    contactMode: {
      type: String,
      default: "NONE",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      regex: /^\S+@\S+\.\S+$/,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
