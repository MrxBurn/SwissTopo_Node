import { describe, it, expect, vi } from 'vitest';
import supertest from 'supertest';
import client from "../postgres_connection.js"
import { app } from '../apis.js';




describe('GET /getMarkers', () => {
    it('should return markers from the database', async () => {
        const mockResult = { rows: [{ id: 1, title: "First", description: 'Marker 1' }, { id: 2, title: "Second", description: 'Marker 2' }] };
        vi.spyOn(client, 'query').mockResolvedValue(mockResult);

        const response = await supertest(app).get('/getMarkers');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResult.rows);
    });

    it('should return 500 if there is an internal server error', async () => {
        vi.spyOn(client, 'query').mockRejectedValue(new Error('Database error'));

        const response = await supertest(app).get('/getMarkers');

        expect(response.status).toBe(500);
    });
});

describe('POST /addMarker', () => {
    it('should be called successfully', async () => {
        const mockResult = { rows: { id: 1, title: "First", description: 'Marker 1' } };

        const mockPostBody = {
            id: 1, title: "First", description: 'Marker 1', latitude: "46.94365768018451",
            longitude: "7.448889610708717"
        }

        vi.spyOn(client, 'query').mockResolvedValue(mockResult);

        await supertest(app).post('/addMarker').send(mockPostBody).expect(201);
    });

    it('should return 500 if there is an internal server error', async () => {
        vi.spyOn(client, 'query').mockRejectedValue(new Error('Database error'));

        const response = await supertest(app)
            .post('/addMarker')
            .send({
                title: "First",
                description: "Marker 1",
                latitude: "46.94365768018451",
                longitude: "7.448889610708717"
            })
            .expect(500);

        expect(response.text).toBe('Internal server error');
    });
    it('should return 400 if bad request', async () => {

        const response = await supertest(app)
            .post('/addMarker')
            .send({
                title: "First",
                description: "Marker 1",
                latitude: "46.94365768018451",
            })
            .expect(400);

        expect(response.text).toBe('Missing required properties');
    });
});