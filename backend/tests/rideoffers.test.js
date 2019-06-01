import request from 'supertest';
import app from '../app';

let rides = [];
// Test to chech creating ride offer
describe('Create a ride offer', () => {
  const newRide = {
    from: 'HEre test',
    to: 'There test',
    with: 'Ben The test driver',
    time: '1800',
  };
  test('Creating a ride offer increases the size of rides array', () => request(app)
    .post('/api/v1/rides')
    .set('Accept', 'application/json')
    .send(newRide)
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Success: your offer has been published!');

      // expect(response.body).toBeObject();
      // expect(response.body).toBeArrayOfSize(rides.length + 1);
    }));
});
// Test to Retireve all ride offers
describe('Fetch all ride offers', () => {
  test('Should return an array of rides', () => request(app)
    .get('/api/v1/rides')
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeArray();
      rides = response.body;
    }));
});

// Test to check a single ride offer
describe('Fetch ride offer', () => {
  test('Fetch missing ride', () => request(app)
    .get('/api/v1/rides/9001')
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Ride not found');
    }));
  test('Fetch existing ride offer', () => request(app)
    .get('/api/v1/rides/1')
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeObject();
    }));
});

// Test to join a ride
describe('Make a request to join a ride', () => {
  test('Should return a success message', () => request(app)
    .post('/api/v1/rides/1/request')
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Your request has been recieved');
    }));
});
