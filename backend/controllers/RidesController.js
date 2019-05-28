const RideModel = require('../models/Ride');

const Ride = {
  getAll(req, res) {
    const rides = RideModel.findAll();
    return res.status(200).send(rides);
  },
};

module.exports = Ride;
