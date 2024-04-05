import jwt from "jsonwebtoken";

//interfaces
import { HandleJWTPayload } from "interfaces/utils.interface";

export const generateToken = (payload: HandleJWTPayload, expiry: string) => {
  const secret: string = process.env.SECRET_KEY as string;
  const options: object = { expiresIn: expiry };

  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): HandleJWTPayload => {
  try {
    const secret: string = process.env.SECRET_KEY as string;
    const decoded: HandleJWTPayload = jwt.verify(
      token,
      secret
    ) as HandleJWTPayload;
    return decoded;
  } catch (err) {
    if (err instanceof Error) {
      console.error(`ERROR (token_verify) : ${err.message}`);
    } else {
      console.error("ERROR (token_verify) : An unknown error occurred");
    }
    return {
      email: "",
    };
  }
};
