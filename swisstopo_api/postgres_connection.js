import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT,
});

if (process.env.NODE_ENV !== 'test') {
  client.connect()
    .then(() => console.log('Connected to PostGIS!'))
    .catch(err => console.error('Connection error', err.stack));
}

export default client;