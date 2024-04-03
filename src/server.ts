import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user";
import { errorHandler } from "./controllers/error";

const MONGO_URL = process.env.MONGO_URL as string;

mongoose
    .connect(MONGO_URL)
    .then(() => {
        const server = express();

        server.use(express.json());
        server.use(cors());

        server.use("/users", userRoutes);

        /*
            Handling Error I Did not Finish, the Idia Is:
            for Middleware return the validation reasons
            for DB just return 400 error or 500 
        */
        server.use(errorHandler);

        const port = process.env.PORT || 8000;
        server.listen(port, () => console.log("Server Start Running"));
    })
    .catch((error) => {
        console.error(error);
    });
