import dotenv from 'dotenv';

dotenv.config();

export const environment = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || '&&4ppCr3d1t0st35t$$',
    database: {
        postgres: {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: process.env.POSTGRES_PORT || 5434,
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'R00tG4t0',
        dbName: process.env.POSTGRES_DB || 'credit',
        },
        mongo: {
        host: process.env.MONGO_HOST || 'localhost',
        port: process.env.MONGO_PORT || 27017,
        dbName: process.env.MONGO_DB || 'amortization',
        }
    }
};
