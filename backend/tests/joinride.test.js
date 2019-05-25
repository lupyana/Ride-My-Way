const request = require('supertest');
const app = require('../app');

// Test to check a join a
describe('Join a ride', () => {
  test('Should return status of joining', () => request(app)
    .get('/api/v1/rides/1/requests')
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
    }));
});
