console.log("Hello, World!");

/**
 * The purpose of this file is to serve as the entry point for the application.
 * It will import and initialize the database connection and start the Express server.
 */

import express from "express";
import { AppDataSource } from "./db/client";

const app = express();
const PORT = 3000;

app.use(express.json());
AppDataSource.initialize()
    .then(() => {
        console.log("Database connection established successfully!");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error initializing database connection:", error);
    });