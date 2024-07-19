const { response } = require('express');
const { get } = require('lodash/object');
const app = require('../../app');
const request = require('supertest');

describe('/petitions', () => {
    test('it is available', async () => {
        /** @type {Response} */
        const res = await request(app).get('/petitions');
        expect(res.status).toBe(200);
    });

    test('it returns a JSON response', async () => {
        /** @type {Response} */
        const res = await request(app).get('/petitions');
        expect(get(res.headers, 'content-type')).toContain('application/json');
    });

    test('it returns only 3 records', async () => {
        /** @type {Response} */
        const res = await request(app).get('/petitions');

        expect(res.body.length).toBeLessThanOrEqual(3);
    });

    test('it returns a list of ordered records based on created_at field', async () => {
        /** @type {Response} */
        const res = await request(app).get('/petitions');
        let prev = new Date();

        /**
         * Logic to test that all created_at field values are lower than previous (descendent order)
         */
        const all = res.body.every((item) => {
            const current = new Date(item.created_at);
            const result = current <= prev;
            prev = current;

            return result;
        });

        expect(all).toBeTruthy();
    });
});

describe('/petitions/:id/feed', () => {
    test('it is available', async () => {
        /** @type {Response} */
        const res = await request(app).get('/petitions/12/feed');
        expect(res.status).toBe(200);
    });

    test('it returns a JSON response', async () => {
        /** @type {Response} */
        const res = await request(app).get('/petitions/12/feed');
        expect(get(res.headers, 'content-type')).toContain('application/json');
    });

    test('it returns all records', async () => {
        /** @type {Response} */
        const res = await request(app).get('/petitions/12/feed');

        expect(res.body.length).toBeLessThanOrEqual(3);
    });

    test('it returns a list of ordered records based on updated_at field', async () => {
        /** @type {Response} */
        const res = await request(app).get('/petitions/12/feed');

        let prev = new Date();

        /**
         * Logic to test that all updated_at field values are lower than previous (descendent order)
         */
        const all = res.body.every((item) => {
            const current = new Date(item.updated_at);
            const result = current <= prev;
            prev = current;

            return result;
        });

        expect(all).toBeTruthy();
    });

    test('it returns an empty list when records does not match with criteria', async () => {
        /** @type {Response} */
        const res = await request(app).get('/petitions/999/feed');
        expect(res.status).toBe(200);

        expect(res.body.length).toBe(0);
    });
});
