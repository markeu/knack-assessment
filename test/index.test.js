const request = require('supertest');
const httpStatus = require('http-status');

const app = require('../src/app');
const mockJson = require('./jest_mock_data.json');

describe('Duplicate endpoint tests', () => {
    test('Should return 200 on successfuly filtering + saving', async () => {
        const res = await request(app).get('/v1/sanitize');

        expect(httpStatus.OK)
        expect(res.body.data).toEqual(mockJson)
        expect(res.body.status).toEqual(true)
    });

    test('Should return 400 on wrong api request', async () => {
        const res = await request(app).get('/v2/sanitize');

        expect(httpStatus.NOT_FOUND);
        expect(res.body.message).toEqual("Not found");
        expect(res.body.code).toEqual(httpStatus.NOT_FOUND);
        expect(res.body).toEqual({ "code": httpStatus.NOT_FOUND, "message": "Not found" });
    });

    test('Should valid object properties + count', async () => {
        const res = await request(app).get('/v1/sanitize');
        let totalLength = 0;
        res.body.data.versions[0].objects.forEach(item => {
            totalLength += item.fields.length;
        });

        expect(httpStatus.OK)
        expect(totalLength).toEqual(res.body.data.field_count);
        expect(res.body.data.versions).toEqual(mockJson.versions);
        expect(res.body.data.versions[0].objects.length).toEqual(res.body.data.object_count);
    });

    test('Should valid sanitized scenes properties + count', async () => {
        const res = await request(app).get('/v1/sanitize');
        let totalLength = 0;
        res.body.data.versions[0].scenes.forEach(item => {
            totalLength += item.views.length;
        });

        expect(httpStatus.OK)
        expect(totalLength).toEqual(res.body.data.view_count);
        expect(res.body.data.versions).toEqual(mockJson.versions);
        expect(res.body.data.versions[0].scenes.length).toEqual(res.body.data.scene_count);
    });

    test('Should fail if scenes views properties count do not tally as specified', async () => {
        const res = await request(app).get('/v1/sanitize');
        let totalLength = 0;
        res.body.data.versions[0].scenes.forEach(item => {
            totalLength += item.views.length;
        });

        expect(httpStatus.OK)
        expect(totalLength + 10).not.toBe(res.body.data.view_count);
    });

    test('Should fail if object field properties count do not tally as specified', async () => {
        const res = await request(app).get('/v1/sanitize');
        let totalLength = 0;
        res.body.data.versions[0].objects.forEach(item => {
            totalLength += item.fields.length;
        });

        expect(httpStatus.OK)
        expect(totalLength + 10).not.toBe(res.body.data.object_count);
    });
})

