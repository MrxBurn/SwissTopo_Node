import pg from 'pg';


const client = new pg.Client({
  user: 'postgres',  // Default is usually 'postgres'
  host: 'localhost',           // Use the container's IP if needed
  database: 'swisstopo_postgis',   // Change to your database name
  password: 'swisstopo',   // Set this properly
  port: 5432,                  // Default PostgreSQL port
});

client.connect()
  .then(() => console.log('Connected to PostGIS!'))
  .catch(err => console.error('Connection error', err.stack));


export default client;