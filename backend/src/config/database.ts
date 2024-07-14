import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { Credit } from "../entities/Credit";
import { User } from "../entities/User";
import { CreditUser } from "../entities/CreditUser";

dotenv.config();

export const postgresDataSource = new DataSource ({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [
        Credit,
        User,
        CreditUser
    ],
});

export const mongoDataSource = new DataSource ({
    type: 'mongodb',
    host: process.env.MONGO_HOST,
    port: Number(process.env.MONGO_PORT),
    database: process.env.MONGO_DB,
    useUnifiedTopology: true,
    synchronize: true,
    logging: false,
    entities: [],
});