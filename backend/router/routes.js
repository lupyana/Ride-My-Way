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

router.get('/rides', Ride.getAll);
router.post('/rides', Ride.create);
router.get('/rides/:id', Ride.getOne);
router.post('/rides/:id/request', (req, res) => {
  res.status(200).json({ message: 'Your request has been recieved' });
});

export default router;
