"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _RidesController = _interopRequireDefault(require("../controllers/RidesController"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// get an instance of the express Router
var router = _express["default"].Router();

var SECRET_KEY = 'secretkey23456'; // Custom middleware

router.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers.authorization; // decode token

  if (token) {
    // verifies secret and checks exp
    _jsonwebtoken["default"].verify(token, SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } // if everything is good, save to request for use in other routes


      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(401).send({
      success: false,
      message: 'Dude where is your token.'
    });
  }
}); // Fetch all available rides

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

router.get('/rides', _RidesController["default"].getAll); // Fetch the details of a single ride

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

router.get('/rides/:id', _RidesController["default"].getOne); // Create a ride offer

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

router.post('/rides', _RidesController["default"].create); // Make a request to join a ride.

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

router.post('/rides/:id/request', _RidesController["default"].request); // Fetch all ride requests by ud

/**
 * @swagger
 *
 * /api/vi/users/rides/{user_id}/requests:
 *   get:
 *     tags:
 *       - "Rides"
 *     summary: "Fetch all ride requests using ride id"
 *     description: This route should return a list of ride requests and statuses
 *     parameters:
 *      - name: "user_id"
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

router.get('/users/rides/:id/requests', _UserController["default"].getRequests); // Fetch all ride offers by ud

/**
 * @swagger
 *
 * /api/vi/users/rides/{user_id}/offers:
 *   get:
 *     tags:
 *       - "Rides"
 *     summary: "Fetch all ride offers using ride id"
 *     description: This route should return a list of ride offers and statuses
 *     parameters:
 *      - name: "user_id"
 *        in: "path"
 *        description: "ID of user"
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

router.get('/users/rides/:id/offers', _UserController["default"].getOffers); // Fetch users ride history

/**
 * @swagger
 *
 * /api/vi/users/{user_id}/rides/history:
 *   get:
 *     tags:
 *       - "Rides"
 *     summary: "Fetch users ride history"
 *     description: This route should return a list of rides user has taken before
 *     parameters:
 *      - name: "user_id"
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

router.get('/users/:user_id/rides/history', _UserController["default"].getHistory); // Accept or reject a ride request.
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

router.put('/users/rides/:ride_id/requests/:request_id', _UserController["default"].replyRequests);
var _default = router;
exports["default"] = _default;