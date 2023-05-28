import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import * as dotenv from 'dotenv';
import { UserTypeOrm } from "../auth/infraestructure/UserTypeOrm";

dotenv.config();

const process = require("process");

const host: string = process.env.DB_HOST;
const port: number = process.env.DB_PORT;
const username: string = process.env.DB_USER;
const password: string = process.env.DB_PASSWORD;
const database: string = process.env.DB_NAME;

export const dbConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    entities: [UserTypeOrm],
    synchronize: true,
};