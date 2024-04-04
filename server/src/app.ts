import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// TODO: Change this to the whitelisted origins (before deploying)
app.use(
    cors({
        origin: "*",
    })
);

app.use(cookieParser());

export default app;