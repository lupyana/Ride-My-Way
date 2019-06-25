"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rides = [];
var token = '';
var newUser = {
  email: 'johndoe@exaple.com',
  password: 'password',
  fname: 'John',
  lname: 'Doe'
};
var user = {
  email: 'johndoe@exaple.com',
  password: 'wrongpassword'
};
describe('User creation', function () {
  test('Create a new user', function (done) {
    (0, _supertest["default"])(_app["default"]).post('/api/v1/auth/register').send(newUser).end(function (error, response) {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(201);
      expect(response.body.code).toBeNumber();
      expect(response.body.message).toBe('We have sent a verification code to your email! Enter the code to complete the verification process');
      done();
    });
  });
  test('Fail to create a new user but email exist', function (done) {
    (0, _supertest["default"])(_app["default"]).post('/api/v1/auth/register').send(newUser).end(function (error, response) {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Email already exists');
      done();
    });
  });
});
describe('User Login', function () {
  test('Auth user does not exist', function (done) {
    (0, _supertest["default"])(_app["default"]).post('/api/v1/auth/login').send({
      email: 'janedoe@exaple.com',
      password: 'wrongpassword'
    }).end(function (error, response) {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('The user does not exists');
      done();
    });
  });
  test('Auth user fail', function (done) {
    (0, _supertest["default"])(_app["default"]).post('/api/v1/auth/login').send(user).end(function (error, response) {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Password mismatch');
      done();
    });
  });
  test('Auth user success', function (done) {
    (0, _supertest["default"])(_app["default"]).post('/api/v1/auth/login').send(newUser).end(function (error, response) {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeObject();
      expect(response.body.expires_in).toBeNumber();
      expect(response.body.access_token).toBeString();
      token = response.body.access_token;
      done();
    });
  });
}); // Test to chech creating ride offer

describe('Create a ride offer', function () {
  var newRide = {
    from: 'HEre test',
    to: 'There test',
    "with": 1,
    time: '1800'
  };
  test('Creating a ride offer increases the size of rides array', function (done) {
    (0, _supertest["default"])(_app["default"]).post('/api/v1/rides').set({
      Authorization: token
    }).set('Accept', 'application/json').send(newRide).end(function (error, response) {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Success: your offer has been published!');
      done();
    });
  });
}); // Test to Retireve all ride offers

describe('Fetch all ride offers', function () {
  test('Should return an array of rides', function (done) {
    (0, _supertest["default"])(_app["default"]).get('/api/v1/rides').set({
      Authorization: token
    }).set('Accept', 'application/json').end(function (error, response) {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeArray();
      rides = response.body;
      done();
    });
  });
}); // Test to check a single ride offer

describe('Fetch ride offer', function () {
  test('Fetch missing ride', function (done) {
    (0, _supertest["default"])(_app["default"]).get('/api/v1/rides/9001').set({
      Authorization: token
    }).set('Accept', 'application/json').end(function (error, response) {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Ride not found');
      done();
    });
  });
  test('Fetch existing ride offer', function (done) {
    (0, _supertest["default"])(_app["default"]).get('/api/v1/rides/1').set({
      Authorization: token
    }).set('Accept', 'application/json').end(function (error, response) {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeObject();
      done();
    });
  });
}); // Test to join a ride

describe('Make a request to join a ride', function () {
  test('Should join a ride', function (done) {
    (0, _supertest["default"])(_app["default"]).post('/api/v1/rides/1/request').set({
      Authorization: token
    }).set('Accept', 'application/json').send({
      ride_id: 1,
      user_id: 1
    }).end(function (error, response) {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Your request has been recieved');
      done();
    });
  });
}); // Test to join a ride

describe('Accept or reject a ride request.', function () {
  test('Should return a success message', function (done) {
    (0, _supertest["default"])(_app["default"]).put('/api/v1/users/rides/1/requests/1').set({
      Authorization: token
    }).set('Accept', 'application/json').send({
      status: 0
    }).end(function (error, response) {
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});