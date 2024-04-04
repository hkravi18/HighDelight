require("dotenv").config({
    path: `${__dirname}/../.env`
});

import app from "./app";
import connectDB from "./db/connectDB";

const port = process.env.PORT || 4000;

//database connection
connectDB()
    .then(() => {
        app.on("error", (err) => {
            if (err instanceof Error) {
                console.log("ERROR (App error): " + err?.message);
            } else {
                console.log('ERROR (App error): An unknown error occurred');
            }
        });

        app.listen(port, () => {
            console.log(`Server listening on ${port}\n`);
        });
    })
    .catch((err) => {
        console.log("MONGODB connection failed: ", err);
    });