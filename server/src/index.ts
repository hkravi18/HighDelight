import dotenv from "dotenv";
dotenv.config({
  path: `${__dirname}/../.env`,
});

import app from "./app";
import connectDB from "./db/connectDB";

const port = process.env.PORT || 4000;

//middlewares
import logger from "./middlewares/logger.middleware";

//routes
import authRoute from "./routes/auth.route";
import otpRoute from "./routes/otp.route";
import errorHandler from "./middlewares/errorHandler.middleware";

app.use(logger);

app.use("/api/auth/otp", otpRoute);
app.use("/api/auth", authRoute);

app.use(errorHandler);

//database connection
connectDB()
  .then(() => {
    app.on("error", (err) => {
      if (err instanceof Error) {
        console.log("ERROR (App error): " + err?.message);
      } else {
        console.log("ERROR (App error): An unknown error occurred");
      }
    });

    app.listen(port, () => {
      console.log(`Server listening on ${port}\n`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed: ", err);
  });
