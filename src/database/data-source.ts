import { DataSource } from "typeorm";
import { config } from 'dotenv';

config({path: '.env.local'});

export default new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'fastcampus',
    password: '1234',
    database: 'nestadvan',
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/*.ts'],
    migrationsTableName: 'migrations'
});