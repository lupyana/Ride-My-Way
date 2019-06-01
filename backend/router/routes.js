// get an instance of the express Router
import express from 'express';
import Ride from '../controllers/RidesController';
import User from '../controllers/UserController';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world' });
});

router.get('/rides', Ride.getAll);
router.post('/rides', Ride.create);
router.get('/rides/:id', Ride.getOne);

router.post('/rides/:id/request', (req, res) => {
  res.status(200).json({ message: 'Your request has been recieved' });
});

// User routes
router.post('/auth/register', User.register);
router.post('/auth/verify', User.verify);
router.post('/auth/login', User.login);

export default router;
