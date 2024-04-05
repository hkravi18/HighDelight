import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";

//models
import User from "../models/user.model";

//utils
import handleValidation from "utils/handleValidation";
import { generateToken } from "utils/handleJWT";

//interfaces
import {
  SignInRequestBody,
  SignUpRequestBody,
} from "../interfaces/request.interface";
import { HandleValidation } from "interfaces/utils.interface";

import CustomError from "lib/customError";

// @desc     User Signup
// route     POST /api/auth/signup
// @access   Public
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
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
      const error = new CustomError(validationRes.error, 400, "signup");
      next(error);
      return;
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      const error = new CustomError(
        "User already exists. Please Login",
        409,
        "signup"
      );
      next(error);
      return;
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
      return res.status(201).json({
        ok: true,
        message: "User registered successfully.",
        data: {
          user: {
            email: user.email,
            token,
          },
        },
      });
    } else {
      const error = new CustomError(
        "User Registration failed, Please try again.",
        500,
        "signup"
      );
      next(error);
      return;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`ERROR (signup): ${err.message}`);
    }

    const error = new CustomError(
      "User Registration failed, Please try again.",
      500,
      "signup"
    );
    next(error);
    return;
  }
};

// @desc     User Login
// route     POST /api/auth/login
// @access   Public
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
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
      "signup"
    );
    if (!validationRes.valid) {
      const error = new CustomError(validationRes.error, 400, "login");
      next(error);
      return;
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      const error = new CustomError(
        "Incorrect email or password",
        401,
        "login"
      );
      next(error);
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      const error = new CustomError(
        "Incorrect email or password",
        401,
        "login"
      );
      next(error);
      return;
    }

    const token = generateToken(
      {
        email: user.email,
      },
      "2h"
    );

    return res.status(200).json({
      ok: true,
      message: "User logged in successfully.",
      data: {
        user: {
          email: user.email,
          token,
        },
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(`ERROR (login): ${err.message}`);
    }

    const error = new CustomError(
      "User Login failed, Please try again.",
      500,
      "login"
    );
    next(error);
    return;
  }
};
