// get an instance of the express Router
import express from 'express';
import jwt from 'jsonwebtoken';

import Ride from '../controllers/RidesController';

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
    return res.status(403).send({
      success: false,
      message: 'Dude where is your token.',
    });
  }
});

// Fetch all available rides
router.get('/rides', Ride.getAll);

// Fetch the details of a single ride
router.get('/rides/:id', Ride.getOne);

// Create a ride offer
router.post('/rides', Ride.create);

// Make a request to join a ride.
router.post('/rides/:id/requests', Ride.request);

export default router;
