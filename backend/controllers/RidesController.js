const RideModel = require('../models/Ride');

const Ride = {
  getAll(req, res) {
    const rides = RideModel.findAll();
    return res.status(200).send(rides);
  },
  getOne(req, res) {
    const ride = RideModel.findOne(req.params.id);
    if (!ride) {
      return res.status(404).send({ message: 'Ride not found' });
    }
    return res.status(200).send(ride);
  },
};

module.exports = Ride;
