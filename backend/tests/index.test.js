import request from 'supertest';
import app from '../app';

describe('User creation', () => {
  const newUser = {
    email: 'johndoe@exaple.com',
    password: 'password',
    fname: 'John',
    lname: 'Doe',
  };
  test('Create a new user', () => request(app)
    .post('/api/v1/auth/register')
    .send(newUser)
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(201);
      expect(response.body.code).toBeNumber();
      expect(response.body.message).toBe(
        'We have sent a verification code to your email! Enter the code to complete the verification process',
      );
    }));
  test('Create a new user but email exist', () => request(app)
    .post('/api/v1/auth/register')
    .send(newUser)
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Email already exists');
    }));
});
