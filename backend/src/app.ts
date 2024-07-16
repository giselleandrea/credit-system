import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { 
    postgresDataSource, 
    mongoDataSource 
} from './config/database';
import { environment } from "./config/environment";
import { Client } from 'pg';
import { MongoClient } from 'mongodb';
import routes, {
    authRoutes,
    creditRoutes,
    dashboardRoutes
} from './routes/index';
import path from "path";

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json()); 
app.use(morgan("dev"));
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(authRoutes);
app.use(creditRoutes);
app.use(dashboardRoutes);

const createPostgresDatabase = async () => {
    const client = new Client({
        host: environment.database.postgres.host,
        port: Number(environment.database.postgres.port),
        user: environment.database.postgres.username,
        password: environment.database.postgres.password,
    });

    try {
        await client.connect();
            const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${environment.database.postgres.dbName}'`);
            if (res.rowCount === 0) {
                await client.query(`CREATE DATABASE ${environment.database.postgres.dbName}`);
                console.log(`Database ${environment.database.postgres.dbName} created`);
            } else {
                console.log(`Database ${environment.database.postgres.dbName} already exists`);
            }
        } catch (err) {
            console.error('Error creating PostgreSQL database:', err);
        } finally {
            await client.end();
    }
};

const createMongoDatabase = async () => {
    const url = `mongodb://${environment.database.mongo.host}:${environment.database.mongo.port}`;
    const client = new MongoClient(url);

    try {
        await client.connect();
        const dbList = await client.db().admin().listDatabases();
        const dbExists = dbList.databases.some(db => db.name === environment.database.mongo.dbName);

        if (!dbExists) {
            await client.db(environment.database.mongo.dbName).createCollection('dummy');
            console.log(`Database ${environment.database.mongo.dbName} created`);
        } else {
            console.log(`Database ${environment.database.mongo.dbName} already exists`);
        }
    } catch (err) {
        console.error('Error creating MongoDB database:', err);
    } finally {
        await client.close();
    }
};


async function startServer() {
    await createPostgresDatabase();
    await createMongoDatabase();

    try {
        await postgresDataSource.initialize();
        console.log('Connected to PostgreSQL database');

        await mongoDataSource.initialize();
        console.log('Connected to MongoDB database');

        const PORT = environment.port
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        }); 
    } catch (error) {
        console.log('Error:', error);    
    }
}
startServer();