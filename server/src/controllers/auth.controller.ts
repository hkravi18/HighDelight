import bcrypt from "bcrypt";
import { Response, Request } from "express";

//models
import User from "../models/user.model";

//utils
import handleValidation from "../utils/handleValidation";
import { generateToken } from "../utils/handleJWT";

//interfaces
import {
  SignInRequestBody,
  SignUpRequestBody,
} from "../interfaces/request.interface";
import { HandleValidation } from "interfaces/utils.interface";

// import CustomError from "../lib/customError";

// @desc     User Signup
// route     POST /api/auth/signup
// @access   Public
export const signup = async (
  req: Request,
  res: Response
  //next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      contactMode,
      email,
      password,
      confirmPassword,
    }: SignUpRequestBody = req.body;
    const validationRes: HandleValidation = handleValidation(
      firstName,
      lastName,
      contactMode,
      email,
      password,
      confirmPassword,
      "signup"
    );

    if (!validationRes.valid) {
      return res.status(400).json({
        ok: false,
        error: validationRes.error,
        data: {},
      });
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(409).json({
        ok: false,
        error: "User already exists. Please Login",
        data: {},
      });
    }

    //hashing the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactMode,
      password: hashedPassword,
    });

    const token = generateToken(
      {
        email: user.email,
      },
      "2h"
    );

    if (user) {
      res.cookie("token", token, {
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });
      res.cookie("email", user.email, {
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });

      return res.status(201).json({
        ok: true,
        message: "User registered successfully.",
        data: {
          user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            contactMode: user.contactMode,
            token,
          },
        },
      });
    } else {
      return res.status(500).json({
        ok: false,
        error: "User Registration failed, Please try again.",
        data: {},
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`ERROR (signup): ${err.message}`);
    }
    return res.status(500).json({
      ok: false,
      error: "User Registration failed, Please try again.",
      data: {},
    });
  }
};

// @desc     User Login
// route     POST /api/auth/login
// @access   Public
export const login = async (
  req: Request,
  res: Response
  //next: NextFunction
) => {
  try {
    const { email, password }: SignInRequestBody = req.body;

    const validationRes: HandleValidation = handleValidation(
      "",
      "",
      "",
      email,
      password,
      "",
      "login"
    );
    if (!validationRes.valid) {
      return res.status(400).json({
        ok: false,
        error: validationRes.error,
        data: {},
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "Incorrect email or password",
        data: {},
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        ok: false,
        error: "Incorrect email or password",
        data: {},
      });
    }

    const token = generateToken(
      {
        email: user.email,
      },
      "2h"
    );

    res.cookie("token", token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
    res.cookie("email", user.email, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    return res.status(200).json({
      ok: true,
      message: "User logged in successfully.",
      data: {
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          contactMode: user.contactMode,
          token,
        },
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(`ERROR (login): ${err.message}`);
    }

    return res.status(500).json({
      ok: false,
      error: "User Login failed, Please try again.",
      data: {},
    });
  }
};
