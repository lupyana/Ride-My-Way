// get an instance of the express Router
import express from 'express';
import jwt from 'jsonwebtoken';

import Ride from '../controllers/RidesController';
import User from '../controllers/UserController';

const router = express.Router();
const SECRET_KEY = 'secretkey23456';

// Custom middleware
router.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers.authorization;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(401).send({
      success: false,
      message: 'Dude where is your token.',
    });
  }
});

// Fetch all available rides
/**
 * @swagger
 *
 * /api/vi/rides:
 *   get:
 *     tags:
 *       - "Rides"
 *     summary: "Fetch all available rides"
 *     description: This route should return a list of all rides
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfull retrieval
 *       401:
 *         description: Unauthorized, token was not provided
 */
router.get('/rides', Ride.getAll);

// Fetch the details of a single ride
/**
 * @swagger
 *
 * /api/vi/rides/{ride_id}:
 *   get:
 *     tags:
 *       - "Rides"
 *     summary: "Fetch the details of a single ride"
 *     description: This route should return a rides object
 *     parameters:
 *      - name: "ride_id"
 *        in: "path"
 *        description: "ID of ride to return"
 *        required: true
 *        type: "integer"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfull retrieval
 *       401:
 *         description: Unauthorized, token was not provided
 */
router.get('/rides/:id', Ride.getOne);

// Create a ride offer
/**
 * @swagger
 *
 * /api/vi/rides:
 *   post:
 *     tags:
 *       - "Rides"
 *     summary: "Create a ride offer"
 *     description: Post a ride offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: from
 *         description: Ride start point.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: to
 *         description: Ride ending point.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: time
 *         description: Ride starting time.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: with
 *         description: user id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: price
 *         description: Ride offer price.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Offer has been published
 *       400:
 *         description: Missing parameters
 *       401:
 *         description: Unauthorized, token was not provided
 */
router.post('/rides', Ride.create);

// Make a request to join a ride.
/**
 * @swagger
 *
 * /api/vi/rides/{ride_id}/request:
 *   post:
 *     tags:
 *       - "Rides"
 *     summary: "Make a request to join a ride"
 *     description: Post a ride offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         description: Id of the user.
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Reguest has been recieved
 *       400:
 *         description: Missing parameters
 *       401:
 *         description: Unauthorized, token was not provided
 */
router.post('/rides/:id/request', Ride.request);

// Fetch all ride requests
/**
 * @swagger
 *
 * /api/vi/users/rides/{ride_id}/requests:
 *   get:
 *     tags:
 *       - "Rides"
 *     summary: "Fetch all ride requests"
 *     description: This route should return a list of ride requests and statuses
 *     parameters:
 *      - name: "ride_id"
 *        in: "path"
 *        description: "ID of ride to return"
 *        required: true
 *        type: "integer"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfull retrieval
 *       401:
 *         description: Unauthorized, token was not provided
 */
router.get('/users/rides/:id/requests', User.getRequests);

// Accept or reject a ride request.
// Fetch all ride requests
/**
 * @swagger
 *
 * /api/vi/users/rides/{ride_id}/requests/{request_id}:
 *   put:
 *     tags:
 *       - "Rides"
 *     summary: "Accept or reject a ride request"
 *     description: Allow user to accept or decline a request
 *     parameters:
 *      - name: "ride_id"
 *        in: "path"
 *        description: "ID of ride "
 *        required: true
 *        type: "integer"
 *      - name: "request_id"
 *        in: "path"
 *        description: "ID of ride request "
 *        required: true
 *        type: "integer"
 *      - name: "status"
 *        in: "formData"
 *        description: "0 to decline 1 to accept"
 *        required: true
 *        type: "integer"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfull
 *       400:
 *         description: Missing parameters
 *       401:
 *         description: Unauthorized, token was not provided
 */
router.put('/users/rides/:ride_id/requests/:request_id', User.replyRequests);

export default router;
