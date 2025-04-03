import express from 'express'
import cors from 'cors'
import client from './postgres_connection.js'


export const app = express();

app.use(cors());

app.use(express.json());



app.get('/getMarkers', async (req, res) => {
    try {

        const result = await client.query('SELECT * FROM public.topo_markers');
        res.json(result.rows);

    }
    catch (errr) {
        console.error(errr.message);
        res.status(500).send('Internal server error');
    }
});


app.post('/addMarker', async (req, res) => {
    const { title, description, latitude, longitude } = req.body;

    const isBodyEmpty = !title || !description || !latitude || !longitude;

    if (isBodyEmpty) {
        return res.status(400).send('Missing required properties');
    }

    try {
        const query = `
        INSERT INTO public.topo_markers (title, description, geom)
        VALUES ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326)) RETURNING *;
    `;

        const result = await client.query(query, [title, description, longitude, latitude]);

        res.status(201).json(result.rows[0]);

    } catch (errr) {
        console.error(errr.message);
        res.status(500).send('Internal server error');
    }
});

app.listen(3000)