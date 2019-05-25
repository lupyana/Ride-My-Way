const request = require('supertest');
const app = require('../app');

let rides = [];
// Test to Retireve all ride offers
describe('Fetch all ride offers', () => {
  test('Should return an array of rides', () => request(app)
    .get('/api/v1/rides')
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.rides).toBeArray();
      rides = response.body.rides;
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

describe('Create a ride offer', () => {
  test('Creating a ride offer increases the size of rides array', () => request(app)
    .post('/api/v1/rides')
  // .send({ name: 'john' })
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.rides).toBeArray();
      expect(response.body.rides).toBeArrayOfSize(rides.length + 1);
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
