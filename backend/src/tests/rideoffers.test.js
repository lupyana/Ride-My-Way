import request from 'supertest';
import app from '../app';

let rides = [];
let token = '';

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
  test('Create a new user', (done) => {
    request(app)
      .post('/api/v1/auth/register')
      .send(newUser)
      .end((error, response) => {
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(201);
        expect(response.body.code).toBeNumber();
        expect(response.body.message).toBe(
          'We have sent a verification code to your email! Enter the code to complete the verification process',
        );
        done();
      });
  });
  test('Fail to create a new user but email exist', (done) => {
    request(app)
      .post('/api/v1/auth/register')
      .send(newUser)
      .end((error, response) => {
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Email already exists');
        done();
      });
  });
});

describe('User Login', () => {
  test('Auth user does not exist', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'janedoe@exaple.com',
        password: 'wrongpassword',
      })
      .end((error, response) => {
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('The user does not exists');
        done();
      });
  });
  test('Auth user fail', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((error, response) => {
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Password mismatch');
        done();
      });
  });

  test('Auth user success', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(newUser)
      .end((error, response) => {
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toBeObject();
        expect(response.body.expires_in).toBeNumber();
        expect(response.body.access_token).toBeString();
        token = response.body.access_token;
        done();
      });
  });
});

// Test to chech creating ride offer
describe('Create a ride offer', () => {
  const newRide = {
    from: 'HEre test',
    to: 'There test',
    with: 1,
    time: '1800',
  };
  test('Creating a ride offer increases the size of rides array', (done) => {
    request(app)
      .post('/api/v1/rides')
      .set({ Authorization: token })
      .set('Accept', 'application/json')
      .send(newRide)
      .end((error, response) => {
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Success: your offer has been published!');
        done();
      });
  });
});
// Test to Retireve all ride offers
describe('Fetch all ride offers', () => {
  test('Should return an array of rides', (done) => {
    request(app)
      .get('/api/v1/rides')
      .set({ Authorization: token })
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeArray();
        rides = response.body;
        done();
      });
  });
});

// Test to check a single ride offer
describe('Fetch ride offer', () => {
  test('Fetch missing ride', (done) => {
    request(app)
      .get('/api/v1/rides/9001')
      .set({ Authorization: token })
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Ride not found');
        done();
      });
  });
  test('Fetch existing ride offer', (done) => {
    request(app)
      .get('/api/v1/rides/1')
      .set({ Authorization: token })
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeObject();
        done();
      });
  });
});

// Test to join a ride
describe('Make a request to join a ride', () => {
  test('Should join a ride', (done) => {
    request(app)
      .post('/api/v1/rides/1/request')
      .set({ Authorization: token })
      .set('Accept', 'application/json')
      .send({
        ride_id: 1,
        user_id: 1,
      })
      .end((error, response) => {
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Your request has been recieved');
        done();
      });
  });
});

// Test to join a ride
describe('Accept or reject a ride request.', () => {
  test('Should return a success message', (done) => {
    request(app)
      .put('/api/v1/users/rides/1/requests/1')
      .set({ Authorization: token })
      .set('Accept', 'application/json')
      .send({
        status: 0,
      })
      .end((error, response) => {
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
