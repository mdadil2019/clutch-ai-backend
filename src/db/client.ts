//The purpose of the file is to create a connection to the database using TypeORM and 
// export the connection for use in other parts of the application.

import "reflect-metadata";
import { DataSource } from "typeorm";
import Stream from "../models/streams";
import Event from "../models/events";

//TODO: remove the hardcoded env variables and use a env variable management library like dotenv 
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "mohammadadil",
    password: "",
    database: "clutch_ai_db",
    logging: false,
    entities: [Stream, Event],
    migrations: ["dist/db/migrations/*.js"],
    migrationsRun: true,
});
