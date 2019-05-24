const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
  test('It should response the GET method', () => request(app)
    .get('/')
    .then((response) => {
      expect(response.statusCode).toBe(200);
    }));
});

// describe('App', () => {
//   test('it says hello', done => request(app)
//     .get('/')
//     .expect(200, {
//       message: 'Hello world',
//     })
//     .end(done));
// });
