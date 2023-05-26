import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const process = require("process");

export const dbConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: <string>process.env.DB_HOST,
    port: <number>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
    password: <string>process.env.DB_PASSWORD,
    database: <string>process.env.DB_NAME,
    entities: [],
    synchronize: true,
};