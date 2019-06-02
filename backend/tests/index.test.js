import request from 'supertest';
import app from '../app';

const newUser = {
  email: 'johndoe@exaple.com',
  password: 'password',
  fname: 'John',
  lname: 'Doe',
};

const user = {
  email: 'johndoe@exaple.com',
  password: 'wrongpassword',
};
describe('User creation', () => {
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

describe('User Login', () => {
  test('Auth user does not exist', () => request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'janedoe@exaple.com',
      password: 'wrongpassword',
    })
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('The user does not exists');
    }));

  test('Auth user fail', () => request(app)
    .post('/api/v1/auth/login')
    .send(user)
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Password mismatch');
    }));

  test('Auth user success', () => request(app)
    .post('/api/v1/auth/login')
    .send(newUser)
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeObject();
      expect(response.body.expires_in).toBeNumber();
      expect(response.body.access_token).toBeString();
    }));
});
