import request from 'supertest';
import app from '../app';

let rides = [];
let token = ';';
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
      token = response.body.access_token;
    }));
});

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
    .set({ Authorization: token })
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
    .set({ Authorization: token })
    .set('Accept', 'application/json')
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
    .set({ Authorization: token })
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Ride not found');
    }));
  test('Fetch existing ride offer', () => request(app)
    .get('/api/v1/rides/1')
    .set({ Authorization: token })
    .set('Accept', 'application/json')
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
    .set({ Authorization: token })
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Your request has been recieved');
    }));
});

// Test to join a ride
describe('Accept or reject a ride request.', () => {
  test('Should return a success message', () => request(app)
    .post('/api/v1/users/rides/1/request/1')
    .set({ Authorization: token })
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
    }));
});
