const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
  test('It should response the GET method', () => request(app)
    .get('/api/v1')
    .then((response) => {
      console.log(response);
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Hello world');
    }));
});
