import { DataSource } from 'typeorm';
import { User } from './models/User'; // Ensure the User entity is imported
import { Campaign } from './models/campaign'; // Import the Campaign entity
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST, // Set this in your .env file
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER, // Set this in your .env file
  password: process.env.DB_PASSWORD, // Set this in your .env file
  database: process.env.DB_NAME, // Set this in your .env file
  synchronize: true, // Set to true for development (auto creates tables)
  logging: false,
  entities: [User, Campaign], // Use the imported entity classes
  migrations:['/src/migrations/*.js']
,
  subscribers: [],
});
