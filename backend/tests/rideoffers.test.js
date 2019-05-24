const request = require('supertest');
const app = require('../app');

describe('Fetch all ride offers', () => {
  test('Should return an array of rides', () => request(app)
    .get('/api/v1/rides')
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.rides).toBeArray();
    }));
});
