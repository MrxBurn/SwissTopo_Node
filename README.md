# Swiss Topo - Node.js & Nginx

This project serves as the backend and api gateway for the Swiss Topo React aplication.

### Tech stack:

- Node.js
- Nginx
- Vitest
- Supertest
- ESLint

### How to run

- `docker-compose up -- build` - Creates the docker container with Node.js, Nginx and PostGIS instance

- Go to `localhost/getMarkers` to test API

### API Documentation:

- /getMarkers

  - Retrieves a list of all markers stored in the database

- /addMarker
  - Allows creation of marker with the following properties:

```
{
    title: String,
    description: String,
    latitude: number,
    longitude: number
}
```
