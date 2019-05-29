import request from 'supertest';
import app from '../app';

describe('Test the root path', () => {
  test('It should response the GET method', () => request(app)
    .get('/api/v1')
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Hello world');
    }));
});
