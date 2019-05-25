const request = require('supertest');
const app = require('../app');

// Test to Retireve all ride offers
describe('Fetch all ride offers', () => {
  test('Should return an array of rides', () => request(app)
    .get('/api/v1/rides')
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.rides).toBeArray();
    }));
});

// Test to check a single ride offer
describe('Fetch a single ride offer', () => {
  test('Should return an object with ride detail', () => request(app)
    .get('/api/v1/rides/1')
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.ride).toBeObject();
    }));
});
