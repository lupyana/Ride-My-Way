// get an instance of the express Router
const express = require('express');

const router = express.Router();
const Ride = require('../controllers/RidesController');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world' });
});

router.get('/rides', Ride.getAll);
router.post('/rides', Ride.create);
router.get('/rides/:id', Ride.getOne);

router.post('/rides/:id/request', (req, res) => {
  res.status(200).json({ message: 'Your request has been recieved' });
});

module.exports = router;
